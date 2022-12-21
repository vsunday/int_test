const express = require("express");
const BoxSDK = require("box-node-sdk");

const app = express();

app.use(express.urlencoded());
app.use(express.json());

const sdk = new BoxSDK({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret
});

app.post("/lockfolder", async (req, res) => {
  try {
    const authCode = req.body.authCode;
    const folderId = req.body.folderId;
/*
    const tokenInfo = await sdk.getTokensAuthorizationCodeGrant(authCode);
    const client = sdk.getBasicClient(tokenInfo.accessToken);

    // 受け取った対象のファイルに対してロックをかける
    await client.folders.lock(folderId);
    */

    res.status(200).json({
      message: `${folderId}`//"folder locked",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || "3000";
app.listen(PORT, (result) => {
  console.log("Express Server started on port: " + PORT);
});
