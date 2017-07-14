chrome:
	cp ~/.ssh/unpepefy.pem key.pem
	zip -r /tmp/unpepefy_chrome.zip content.js icon128.png icon64.png icon48.png icon32.png manifest.json unpepefy.css unpepe.png LICENSE key.pem
	rm key.pem

firefox:
	zip -r /tmp/unpepefy_ff.zip content.js icon128.png icon64.png icon48.png icon32.png manifest.json unpepefy.css unpepe.png LICENSE

clean:
	rm -fv /tmp/unpepefy_*.zip
