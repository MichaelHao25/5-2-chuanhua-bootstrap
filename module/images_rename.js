const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sizeOf = require('image-size');
const {
	exec
} = require('child_process');
const iconv = require('iconv-lite');

function f_main(dirname) {
	var i_last_name = ''
	const fileDirectory = dirname
	fs.watch(fileDirectory + '/img', function(eventType, filename) {
		if (filename.search(/(BMP|CUR|GIF|ICO|JPG|PNG|PSD|TIFF|WebP|SVG|DDS)/i) == -1) return;
		// 判断图片类型
		if (eventType == 'change' && filename.search(/.*?_tmp\d+/) == -1) {
			//处理Photoshop出来的临时文件

			var i_path = path.parse(fileDirectory + '\\img\\' + filename);

			if (i_last_name != i_path.name) {
				//处理多次执行的change事件
				i_last_name = i_path.name;

				f_get_hash(i_path)
			}

		}
	})
}

function f_rename(j_parameters) {

	console.log(j_parameters);
	fs.rename(j_parameters.dir + '\\' + j_parameters.base, j_parameters.dir + '\\' + j_parameters.hash + j_parameters.ext, function(error) {
		if (error) {
			console.log(error);
			return;
		}
		//设置剪切板
		exec('clip').stdin.end(iconv.encode('img/' + j_parameters.hash + j_parameters.ext, 'gbk'));
		console.log('images_info:在上面！！！！！！');
		console.log('finish!')
	})
}

function f_get_hash(j_parameters) {
	var i_response = fs.createReadStream(j_parameters.dir + '\\' + j_parameters.base);
	var i_md5 = crypto.createHash('md5');

	i_response.on('data', i_md5.update.bind(i_md5));

	i_response.on('end', function() {
		var i_hash = i_md5.digest('hex');


		var a_image_size = sizeOf(j_parameters.dir + '\\' + j_parameters.base);

		j_parameters.hash = i_hash + '-' + a_image_size.width + '+' + a_image_size.height;

		if (j_parameters.name == j_parameters.hash) return;
		// 文件名如果就是处理过的就不进行处理

		f_rename(j_parameters)
	});

	i_response.on('error', function(error) {
		// 处理例外情况文件不存在的时候进行
		console.log(error)
		i_response.close();
		return;
	})
}

// f_main('C:\\Users\\doubl\\Desktop\\source')
module.exports = f_main;