import posixpath
import secrets

import cloudinary.api
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from django.conf import settings
from django.core.files.storage import Storage
from django.utils.deconstruct import deconstructible


@deconstructible
class CloudinaryMediaStorage(Storage):
    remote_storage = True

    def __init__(self, folder=None):
        configured_folder = folder if folder is not None else getattr(settings, 'CLOUDINARY_MEDIA_FOLDER', '')
        self.folder = self._normalize_folder(configured_folder)

    def _normalize_folder(self, value):
        return str(value or '').strip().strip('/')

    def _clean_name(self, name):
        return str(name or '').replace('\\', '/').lstrip('/')

    def _split_name(self, name):
        cleaned_name = self._clean_name(name)
        directory, filename = posixpath.split(cleaned_name)
        valid_filename = self.get_valid_name(filename)
        stem, extension = posixpath.splitext(valid_filename)
        extension = extension.lstrip('.').lower()
        return directory.strip('/'), stem or 'upload', extension

    def _join_parts(self, *parts):
        return '/'.join(part.strip('/') for part in parts if part and part.strip('/'))

    def _public_id(self, name):
        cleaned_name = self._clean_name(name)
        public_id, _ = posixpath.splitext(cleaned_name)
        return public_id

    def get_available_name(self, name, max_length=None):
        cleaned_name = self._clean_name(name)
        if not max_length or len(cleaned_name) <= max_length:
            return cleaned_name

        directory, filename = posixpath.split(cleaned_name)
        stem, extension = posixpath.splitext(filename)
        reserved = len(extension) + (len(directory) + 1 if directory else 0)
        allowed_stem_length = max(1, max_length - reserved)
        shortened_name = f"{stem[:allowed_stem_length]}{extension}"
        return posixpath.join(directory, shortened_name) if directory else shortened_name

    def _open(self, name, mode='rb'):
        raise NotImplementedError('CloudinaryMediaStorage does not support direct file reads.')

    def _save(self, name, content):
        directory, stem, extension = self._split_name(name)
        suffix = secrets.token_hex(4)
        public_id = self._join_parts(
            self.folder,
            directory,
            f"{stem}_{suffix}",
        )

        if hasattr(content, 'seek'):
            content.seek(0)

        result = cloudinary.uploader.upload(
            content,
            public_id=public_id,
            overwrite=False,
            resource_type='image',
        )

        stored_extension = (result.get('format') or extension).lower()
        if stored_extension:
            return f"{result['public_id']}.{stored_extension}"
        return result['public_id']

    def delete(self, name):
        public_id = self._public_id(name)
        if not public_id:
            return

        cloudinary.uploader.destroy(
            public_id,
            invalidate=True,
            resource_type='image',
        )

    def exists(self, name):
        return bool(name)

    def size(self, name):
        public_id = self._public_id(name)
        if not public_id:
            return 0

        try:
            resource = cloudinary.api.resource(public_id, resource_type='image')
        except Exception:
            return 0

        return int(resource.get('bytes') or 0)

    def url(self, name):
        cleaned_name = self._clean_name(name)
        public_id, extension = posixpath.splitext(cleaned_name)
        options = {
            'resource_type': 'image',
            'secure': True,
            'type': 'upload',
        }
        if extension:
            options['format'] = extension.lstrip('.')
        return cloudinary_url(public_id, **options)[0]
