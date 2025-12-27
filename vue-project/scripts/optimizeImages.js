// 图片压缩和优化脚本
// 这个脚本可以在开发时使用来压缩图片

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class ImageOptimizer {
  constructor() {
    this.inputDir = path.join(__dirname, '../public/imgs')
    this.outputDir = path.join(__dirname, '../public/imgs-optimized')
    this.supportedFormats = ['.jpg', '.jpeg', '.png', '.webp']
  }

  // 创建输出目录
  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true })
    }
  }

  // 获取所有图片文件
  getImageFiles() {
    const files = []
    
    const scanDir = (dir) => {
      const items = fs.readdirSync(dir)
      items.forEach(item => {
        const fullPath = path.join(dir, item)
        const stat = fs.statSync(fullPath)
        
        if (stat.isDirectory()) {
          scanDir(fullPath)
        } else {
          const ext = path.extname(item).toLowerCase()
          if (this.supportedFormats.includes(ext)) {
            files.push(fullPath)
          }
        }
      })
    }
    
    scanDir(this.inputDir)
    return files
  }

  // 压缩单个图片
  async compressImage(inputPath) {
    const ext = path.extname(inputPath).toLowerCase()
    const basename = path.basename(inputPath, ext)
    const outputPath = path.join(this.outputDir, `${basename}${ext}`)
    
    try {
      // 使用 imagemin 或其他工具进行压缩
      // 这里提供一个简单的示例，实际项目中可能需要安装相关工具
      
      console.log(`正在压缩: ${inputPath}`)
      
      // 使用 cwebp 转换为 WebP（如果系统支持）
      if (this.isCommandAvailable('cwebp') && (ext === '.jpg' || ext === '.jpeg' || ext === '.png')) {
        const webpPath = path.join(this.outputDir, `${basename}.webp`)
        try {
          execSync(`cwebp -q 80 "${inputPath}" -o "${webpPath}"`, { stdio: 'pipe' })
          console.log(`✅ WebP 转换完成: ${webpPath}`)
        } catch (error) {
          console.warn(`⚠️ WebP 转换失败: ${webpPath}`)
        }
      }
      
      // 使用 jpegoptim 压缩 JPEG（如果系统支持）
      if (this.isCommandAvailable('jpegoptim') && (ext === '.jpg' || ext === '.jpeg')) {
        try {
          execSync(`jpegoptim --strip-all --max=80 "${inputPath}" --dest="${this.outputDir}"`, { stdio: 'pipe' })
          console.log(`✅ JPEG 压缩完成: ${outputPath}`)
        } catch (error) {
          console.warn(`⚠️ JPEG 压缩失败: ${outputPath}`)
          // 如果压缩失败，直接复制原文件
          fs.copyFileSync(inputPath, outputPath)
        }
      }
      // 使用 optipng 压缩 PNG（如果系统支持）
      else if (this.isCommandAvailable('optipng') && ext === '.png') {
        try {
          execSync(`optipng -o7 -out "${outputPath}" "${inputPath}"`, { stdio: 'pipe' })
          console.log(`✅ PNG 压缩完成: ${outputPath}`)
        } catch (error) {
          console.warn(`⚠️ PNG 压缩失败: ${outputPath}`)
          fs.copyFileSync(inputPath, outputPath)
        }
      } else {
        // 如果没有压缩工具，直接复制文件
        fs.copyFileSync(inputPath, outputPath)
        console.log(`📁 文件复制完成: ${outputPath}`)
      }
      
      return true
    } catch (error) {
      console.error(`❌ 处理失败: ${inputPath}`, error.message)
      return false
    }
  }

  // 检查命令是否可用
  isCommandAvailable(command) {
    try {
      execSync(`which ${command}`, { stdio: 'pipe' })
      return true
    } catch {
      return false
    }
  }

  // 获取文件大小
  getFileSize(filePath) {
    const stats = fs.statSync(filePath)
    return stats.size
  }

  // 格式化文件大小
  formatFileSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`
  }

  // 生成压缩报告
  generateReport(originalFiles, optimizedFiles) {
    console.log('\n📊 图片压缩报告')
    console.log('='.repeat(50))
    
    let totalOriginalSize = 0
    let totalOptimizedSize = 0
    
    originalFiles.forEach(file => {
      totalOriginalSize += this.getFileSize(file)
    })
    
    optimizedFiles.forEach(file => {
      totalOptimizedSize += this.getFileSize(file)
    })
    
    const savedSpace = totalOriginalSize - totalOptimizedSize
    const compressionRatio = ((savedSpace / totalOriginalSize) * 100).toFixed(1)
    
    console.log(`原始文件总数: ${originalFiles.length}`)
    console.log(`优化后文件总数: ${optimizedFiles.length}`)
    console.log(`原始总大小: ${this.formatFileSize(totalOriginalSize)}`)
    console.log(`优化后总大小: ${this.formatFileSize(totalOptimizedSize)}`)
    console.log(`节省空间: ${this.formatFileSize(savedSpace)} (${compressionRatio}%)`)
    console.log('='.repeat(50))
  }

  // 运行优化
  async run() {
    console.log('🚀 开始图片优化...')
    
    this.ensureOutputDir()
    
    const imageFiles = this.getImageFiles()
    console.log(`发现 ${imageFiles.length} 个图片文件`)
    
    if (imageFiles.length === 0) {
      console.log('没有找到图片文件')
      return
    }
    
    const optimizedFiles = []
    
    for (const file of imageFiles) {
      const success = await this.compressImage(file)
      if (success) {
        const ext = path.extname(file).toLowerCase()
        const basename = path.basename(file, ext)
        const outputPath = path.join(this.outputDir, `${basename}${ext}`)
        
        if (fs.existsSync(outputPath)) {
          optimizedFiles.push(outputPath)
        }
      }
    }
    
    this.generateReport(imageFiles, optimizedFiles)
    console.log('✅ 图片优化完成!')
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const optimizer = new ImageOptimizer()
  optimizer.run().catch(console.error)
}

module.exports = ImageOptimizer