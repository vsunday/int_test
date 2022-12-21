const express = require("express");
const boxSDK = require("box-node-sdk");

const app = express();
    const sdk = new boxSDK({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
    });

app.use(express.urlencoded({ extend: false }));

app.get("/auth", (req, res) => {
  const auth_url = sdk.getAuthorizeURL({response_type: "code"});
  res.redirect(auth_url);
});

app.post("/lockfolder", async (req, res) => {
  try {
    // clientIDと、clientSecretは、構成のクライアントIDとクライアント機密コード
    const sdk = new boxSDK({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
    });

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
