// cloudflare.ts - Cloudflare Images & R2 Direct Upload Helper Service
export interface CloudflareUploadResponse {
  success: boolean;
  imageUrl?: string;
  id?: string;
  error?: string;
}

export const uploadImageToCloudflare = async (file: File): Promise<CloudflareUploadResponse> => {
  const accountId = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID;
  const apiToken = import.meta.env.VITE_CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    console.info("Cloudflare API credentials not supplied. Using mock upload URL.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          imageUrl: URL.createObjectURL(file),
          id: `cf-img-${Date.now()}`
        });
      }, 1000);
    });
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    if (data.success) {
      return {
        success: true,
        imageUrl: data.result.variants[0],
        id: data.result.id,
      };
    } else {
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Cloudflare upload failed',
      };
    }
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network error during Cloudflare upload',
    };
  }
};
