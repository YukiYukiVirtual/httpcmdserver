/**
プレイヤーはこのサーバーを起動しておき、VRCPanoramaからlocalhostにアクセスすると、サーバーは記述した処理を実行する。

実行コマンド
$ node server 

必要ライブラリ
express
$ npm install express
*/

// コマンドを呼び出すためのやつ
const exec = require("child_process").execSync;

// startコマンドを呼び出すための糖衣
const start = query => exec("start " + query);

// HTTPサーバー
const express = require("express");
const app = express();

// 使用ポート設定
app.listen(50505);

// メイン部分
/**
 startコマンドを呼び出す
 例：http://localhost:50505/start/http://yahoo.co.jp
 例：http://localhost:50505/start/picture.png
*/
app.get("/start/*", function(req, res)
{
	//const value = decodeURIComponent(req.params[0]);	// もし動かなかったらパノラマにはencodeURIComponentしたやつを渡して、サーバーでデコードして
	const value = req.params[0];
	start(value);	// startコマンドで既定のプログラムを立ち上げるよ
	
	// VRCPanoramaに404を返す
	res.writeHead(404);
	res.write(value);
	res.end();
});
