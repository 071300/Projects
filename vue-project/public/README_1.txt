请将你的背景图文件（如background.jpg）放置在此public目录中。
然后在Home.vue中修改background-image的路径来使用你的图片。

示例：
- 如果图片名为 "my-background.jpg"，将background-image改为：url('/my-background.jpg')
- 支持的图片格式：.jpg, .png, .gif, .webp等

目前Home.vue使用了CSS渐变作为临时背景。