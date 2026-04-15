Use Cloudinary for uploaded media when running on Render Free.

Backend env:

```env
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
CLOUDINARY_MEDIA_FOLDER=portfolio
SERVE_MEDIA_FILES=True
```

Render setup:

1. Create a Cloudinary account and copy the API environment string.
2. Set `CLOUDINARY_URL` on the Render backend service.
3. Optionally set `CLOUDINARY_MEDIA_FOLDER` to group uploads under one folder.
4. Redeploy the backend.
5. Upload images again from Django admin.

How this project behaves:

- Local development writes uploads to `backend/media`.
- When `CLOUDINARY_URL` is set, Django uploads media to Cloudinary instead.
- The API returns Cloudinary CDN URLs for uploaded images.
