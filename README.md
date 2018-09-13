帕累托火焰 - 基于开放银行的信用贷款平台
---

### 花旗银行 API 的调用 
| 场景   | API 类别 | 详情 | 说明 |
| ------------- | ------------- | ------- | ------- |
| 绑定花旗账号  | Authorize  | 1. GET /authCode/oauth2/authorize （用户授权，获取 code）| 注册平台账号后，点击所有其他功能，都要求绑定花旗账号，否则无法使用。对于没有花旗账号的用户，鼓励其去开设花旗账号（比如跳转到花旗信用卡的申请入口，或者后台定期向平台未绑定花旗账号的用户发送推送消息和邮件提醒） |
|             | Customers  | 2. POST /clientCredentials/oauth2/token/au/gcb （用 code 换取 token）  |
|             |            | 3. GET /v1/customers/profiles （用 token 获取用户信息）|
|             |            | 4. 将用户信息中的唯一标识（preferredEmailAddress）与平台账号绑定
| 初始信用评分 | Accounts  | GET /v1/accounts/{accountId}/transactions | 通过获取用户最近 6 个月的交易流水来给用户确定一个初始信用评分 |
| 用积分抵扣还款 | Pay with points | 1. POST /v1/apac/rewards/linkage (Enroll 拿到 token ) | 在用户还款时，使用其花旗积分抵扣一定金额 |
|              |                 | 2. PUT /v1/apac/rewards/{rewardLinkCode}/activations （激活 token）
 |              |
 |             |                  | 3. GET /v1/apac/rewards/{rewardLinkCode}/pointBalance (计算积分可抵扣的金额)
 | |
 | | | 4. POST /v1/apac/rewards/{rewardLinkCode}/redemption (抵扣申请) | |
 | 转账还款 | Money movement | 账户内互转： POST /v1/moneyMovement/internalDomesticTransfers/preprocess
                            （转账申请） | 通过调用花旗转账 API 实现 App 内还款 |
 | | | POST /v1/moneyMovement/internalDomesticTransfers （确认转账） | |
 | | | 账户间转账（转账给他人）： POST /v1/moneyMovement/externalDomesticTransfer/preprocess （转账申请） | |
 | | | POST /v1/moneyMovement/externalDomesticTransfers （确认转账） | |
 | 查询花旗贷款方案和利率列表 | 目前没有对应的 API |  | 如果开放此接口，可以在平台里根据用户的需求推荐相应的贷款方案 | 