<template>
  <div>
    <input type="file" accept=".jpeg,.jpg,image/jpeg" @change="uploadFile" />
  </div>
</template>

<script>
import { unWrap } from "@/utils/fetchUtils";

export default {
  name: "ImageUploader",
  methods: {
    async uploadFile(event) {
      if (event.target.files.length === 0) return;
      const imageToUpload = event.target.files[0];
      if (!imageToUpload) return;
      const timestamp = Date.now();
      const filename = imageToUpload.name.split(".").slice(0, -1).join(".") + timestamp;
      const options = {
        timestamp,
        public_id: filename
      };

      const response = await unWrap(
        await fetch("/api/cloudinary/signature", {
          method: "POST",
          body: JSON.stringify(options),
          headers: {
            "Content-Type": "application/json"
          }
        })
      );

      const signature = response.json.signature;
      const readData = (fileObj) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(fileObj);
      });

      const data = await readData(imageToUpload);
      const asset = await this.$cloudinary.upload(data, {
        ...options,
        apiKey: this.$config.cloudinary.apiKey,
        signature,
      });

      this.$emit("file-uploaded", asset.secure_url);
    }
  }
};
</script>

<style scoped>

</style>
