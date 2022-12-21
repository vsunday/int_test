const express = require("express");
const bodyParser = require('body-parser');
const boxSDK = require("box-node-sdk");

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post("/lockfolder", async (req, res) => {
    const authCode = req.body.authCode;
    const folderId = req.body.folderId;

    const tokenInfo = await sdk.getTokensAuthorizationCodeGrant(authCode);
    const client = sdk.getBasicClient(tokenInfo.accessToken);

    // 受け取った対象のファイルに対してロックをかける
    await client.folders.lock(folderId);

    res.status(200).json({
      message: "folder locked",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || "3000";
app.listen(PORT, (result) => {
  console.log("Express Server started on port: " + PORT);
});
