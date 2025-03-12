# @oslojs/oauth2

## 代码阅读推荐顺序（中文）

以下是阅读本项目代码的推荐顺序，方便理解 OAuth 2.0 的实现：

1. [src/index.ts](src/index.ts) - 主要实现类和核心功能
   - OAuth2RequestResult - OAuth 2.0 请求结果的基础类
   - TokenRequestResult - 处理令牌请求响应
   - DeviceAuthorizationRequestResult - 处理设备授权请求响应

## 英文文档

**Documentation: https://oauth2.oslojs.dev**

A small JavaScript library for parsing OAuth 2.0 token, token revocation, and device authorization responses by [Oslo](https://oslojs.dev).

This package follows [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749), [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009), and [RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628).

- Runtime-agnostic
- No third-party dependencies
- Fully typed

```ts
import { TokenRequestResult } from "@oslojs/oauth2";

const response = await fetch("https://github.com/login/oauth/access_token", {
 method: "POST",
 body,
 headers
});
const data = await response.json();
if (typeof data !== "object" || data === null) {
 throw new Error("Unexpected response");
}
const result = new TokenRequestResult(data);
if (result.hasErrorCode()) {
 const error = result.errorCode();
 throw new Error(`Request failed: ${error}`);
}
const accessToken = result.accessToken();
const accessTokenExpiresAt = result.accessTokenExpiresAt();
const refreshToken = result.refreshToken();
```

## Installation

```
npm i @oslojs/oauth2
```
