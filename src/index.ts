/**
 * OAuth 2.0 授权框架工具库
 * 
 * 这个文件实现了处理 OAuth 2.0 授权过程中各种响应的类。
 * OAuth 2.0 是一种授权框架，允许第三方应用获得对用户账户的有限访问权限。
 * 
 * 想象一下：你有一个智能手机（用户），有很多应用想要访问你手机上的照片（资源）。
 * 不是每个应用都可以随便看你的照片，而是需要你的同意（授权）。
 * OAuth 2.0 就是管理这种授权过程的规则和方法。
 */

/**
 * OAuth2RequestResult 类 - 处理OAuth 2.0响应的基础类
 * 
 * 这个类就像一个信封拆开器，帮助我们打开和理解服务器回复的内容。
 * 当我们向授权服务器发送请求后，它会回复一个包含各种信息的"信封"。
 * 这个类帮助我们安全地打开信封并读取里面的内容。
 */
export class OAuth2RequestResult {
	/**
	 * body属性 - 存储服务器返回的原始响应数据
	 * 就像信封里的内容，包含了所有服务器告诉我们的信息
	 */
	public body: object;
	
	/**
	 * 构造函数 - 创建一个新的OAuth2RequestResult实例
	 * @param body 服务器返回的响应数据对象
	 * 
	 * 类似于把收到的信封内容放在我们的桌子上准备检查
	 */
	constructor(body: object) {
		this.body = body;
	}
	
	/**
	 * 检查响应中是否包含错误代码
	 * @returns 如果有错误代码则返回true，否则返回false
	 * 
	 * 就像检查信封上是否有"警告"标志
	 */
	public hasErrorCode(): boolean {
		return "error" in this.body && typeof this.body.error === "string";
	}
	
	/**
	 * 获取错误代码
	 * @returns 错误代码字符串
	 * @throws 如果没有错误代码或错误代码格式不正确则抛出错误
	 * 
	 * 如果有"警告"标志，这个方法会告诉我们具体是什么警告
	 */
	public errorCode(): string {
		if ("error" in this.body && typeof this.body.error === "string") {
			return this.body.error;
		}
		throw new Error("Missing or invalid 'error' field");
	}
	
	/**
	 * 检查响应中是否包含错误描述
	 * @returns 如果有错误描述则返回true，否则返回false
	 * 
	 * 检查是否有更详细的错误说明
	 */
	public hasErrorDescription(): boolean {
		return "error_description" in this.body && typeof this.body.error_description === "string";
	}
	
	/**
	 * 获取错误描述
	 * @returns 错误描述字符串
	 * @throws 如果没有错误描述或错误描述格式不正确则抛出错误
	 * 
	 * 获取对错误的详细解释，比如"密码错误"或"用户不存在"
	 */
	public errorDescription(): string {
		if ("error_description" in this.body && typeof this.body.error_description === "string") {
			return this.body.error_description;
		}
		throw new Error("Missing or invalid 'error_description' field");
	}
	
	/**
	 * 检查响应中是否包含错误URI（网址）
	 * @returns 如果有错误URI则返回true，否则返回false
	 * 
	 * 检查是否有一个网址可以提供更多关于错误的信息
	 */
	public hasErrorURI(): boolean {
		return "error_uri" in this.body && typeof this.body.error_uri === "string";
	}
	
	/**
	 * 获取错误URI（网址）
	 * @returns 错误URI字符串
	 * @throws 如果没有错误URI或错误URI格式不正确则抛出错误
	 * 
	 * 获取可以查看更多错误信息的网址
	 */
	public errorURI(): string {
		if ("error_uri" in this.body && typeof this.body.error_uri === "string") {
			return this.body.error_uri;
		}
		throw new Error("Missing or invalid 'error_uri' field");
	}
	
	/**
	 * 检查响应中是否包含状态参数
	 * @returns 如果有状态参数则返回true，否则返回false
	 * 
	 * 状态参数就像一个跟踪号码，帮助我们确认这个响应确实是对应我们发送的那个请求的
	 */
	public hasState(): boolean {
		return "state" in this.body && typeof this.body.state === "string";
	}
	
	/**
	 * 获取状态参数
	 * @returns 状态参数字符串
	 * @throws 如果没有状态参数或状态参数格式不正确则抛出错误
	 * 
	 * 获取请求时设置的跟踪号码，确保响应是为我们的请求生成的
	 */
	public state(): string {
		if ("state" in this.body && typeof this.body.state === "string") {
			return this.body.state;
		}
		throw new Error("Missing or invalid 'state' field");
	}
}

/**
 * TokenRequestResult 类 - 处理令牌请求响应
 * 继承自OAuth2RequestResult基础类
 * 
 * 当用户同意授权后，应用会获得一个"通行证"（令牌）。
 * 这个类帮助我们管理和使用这个通行证。
 * 
 * 想象一下：这就像从游乐园获得一张入园票，票上写着你可以玩哪些游戏，
 * 什么时候票会过期，以及如何在票过期后获得新票。
 */
export class TokenRequestResult extends OAuth2RequestResult {
	/**
	 * 获取令牌类型
	 * @returns 令牌类型字符串，通常是"Bearer"
	 * @throws 如果没有令牌类型或令牌类型格式不正确则抛出错误
	 * 
	 * 就像知道你拿到的是"全天票"还是"单次票"
	 */
	public tokenType(): string {
		if ("token_type" in this.body && typeof this.body.token_type === "string") {
			return this.body.token_type;
		}
		throw new Error("Missing or invalid 'token_type' field");
	}
	
	/**
	 * 获取访问令牌
	 * @returns 访问令牌字符串
	 * @throws 如果没有访问令牌或访问令牌格式不正确则抛出错误
	 * 
	 * 这就是真正的"入园票"，应用程序需要出示这个才能访问用户授权的资源
	 */
	public accessToken(): string {
		if ("access_token" in this.body && typeof this.body.access_token === "string") {
			return this.body.access_token;
		}
		throw new Error("Missing or invalid 'access_token' field");
	}
	
	/**
	 * 获取访问令牌的有效期（秒）
	 * @returns 访问令牌有效期，以秒为单位
	 * @throws 如果没有有效期或有效期格式不正确则抛出错误
	 * 
	 * 告诉我们入园票能用多长时间（比如3600秒=1小时）
	 */
	public accessTokenExpiresInSeconds(): number {
		if ("expires_in" in this.body && typeof this.body.expires_in === "number") {
			return this.body.expires_in;
		}
		throw new Error("Missing or invalid 'expires_in' field");
	}
	
	/**
	 * 计算访问令牌的过期时间点
	 * @returns 表示过期时间的Date对象
	 * 
	 * 根据当前时间和有效期，计算出入园票具体什么时候过期
	 * 例如：如果现在是下午2点，票的有效期是1小时，那么票将在下午3点过期
	 */
	public accessTokenExpiresAt(): Date {
		return new Date(Date.now() + this.accessTokenExpiresInSeconds() * 1000);
	}
	
	/**
	 * 检查响应中是否包含刷新令牌
	 * @returns 如果有刷新令牌则返回true，否则返回false
	 * 
	 * 检查是否有"续票券"，可以在入园票过期后用它获取新票，而不用重新排队
	 */
	public hasRefreshToken(): boolean {
		return "refresh_token" in this.body && typeof this.body.refresh_token === "string";
	}
	
	/**
	 * 获取刷新令牌
	 * @returns 刷新令牌字符串
	 * @throws 如果没有刷新令牌或刷新令牌格式不正确则抛出错误
	 * 
	 * 获取"续票券"，可以在入园票过期后使用它获取新票
	 */
	public refreshToken(): string {
		if ("refresh_token" in this.body && typeof this.body.refresh_token === "string") {
			return this.body.refresh_token;
		}
		throw new Error("Missing or invalid 'refresh_token' field");
	}
	
	/**
	 * 检查响应中是否包含权限范围
	 * @returns 如果有权限范围则返回true，否则返回false
	 * 
	 * 检查入园票上是否标明了你可以玩哪些游戏（比如：可以玩旋转木马和碰碰车，但不能玩过山车）
	 */
	public hasScopes(): boolean {
		return "scope" in this.body && typeof this.body.scope === "string";
	}
	
	/**
	 * 获取权限范围列表
	 * @returns 权限范围字符串数组
	 * @throws 如果没有权限范围或权限范围格式不正确则抛出错误
	 * 
	 * 获取入园票上标明的你可以玩的游戏列表
	 * 例如：["read_photos", "write_posts"] 表示应用可以读取照片和发布文章
	 */
	public scopes(): string[] {
		if ("scope" in this.body && typeof this.body.scope === "string") {
			return this.body.scope.split(" ");
		}
		throw new Error("Missing or invalid 'scope' field");
	}
}

/**
 * DeviceAuthorizationRequestResult 类 - 处理设备授权请求响应
 * 继承自OAuth2RequestResult基础类
 * 
 * 这个类用于处理设备授权流程，适用于没有浏览器或输入困难的设备（如智能电视、游戏机等）。
 * 
 * 想象一下：你想在智能电视上登录YouTube，但在电视上输入账号密码很麻烦。
 * 所以电视给你显示一个简短代码，让你在手机或电脑上访问特定网址并输入这个代码来授权。
 */
export class DeviceAuthorizationRequestResult extends OAuth2RequestResult {
	/**
	 * 获取设备代码
	 * @returns 设备代码字符串
	 * @throws 如果没有设备代码或设备代码格式不正确则抛出错误
	 * 
	 * 这是系统用来识别你的设备的代码，用户看不到，但系统需要它
	 */
	public deviceCode(): string {
		if ("device_code" in this.body && typeof this.body.device_code === "string") {
			return this.body.device_code;
		}
		throw new Error("Missing or invalid 'device_code' field");
	}
	
	/**
	 * 获取用户代码
	 * @returns 用户代码字符串
	 * @throws 如果没有用户代码或用户代码格式不正确则抛出错误
	 * 
	 * 这是显示给用户的代码，比如"XG4B9F"，用户需要在另一个设备上输入这个代码
	 */
	public userCode(): string {
		if ("user_code" in this.body && typeof this.body.user_code === "string") {
			return this.body.user_code;
		}
		throw new Error("Missing or invalid 'user_code' field");
	}
	
	/**
	 * 获取验证URI（网址）
	 * @returns 验证URI字符串
	 * @throws 如果没有验证URI或验证URI格式不正确则抛出错误
	 * 
	 * 这是用户需要访问的网址，在那里输入用户代码完成授权
	 * 例如："https://example.com/device"，用户需要在手机或电脑上打开这个网址
	 */
	public verificationURI(): string {
		if ("verification_uri" in this.body && typeof this.body.verification_uri === "string") {
			return this.body.verification_uri;
		}
		throw new Error("Missing or invalid 'verification_uri' field");
	}
	
	/**
	 * 获取代码的有效期（秒）
	 * @returns 代码有效期，以秒为单位
	 * @throws 如果没有有效期或有效期格式不正确则抛出错误
	 * 
	 * 告诉我们用户代码能用多长时间，用户需要在这段时间内完成授权
	 */
	public codesExpireInSeconds(): number {
		if ("expires_in" in this.body && typeof this.body.expires_in === "number") {
			return this.body.expires_in;
		}
		throw new Error("Missing or invalid 'expires_in' field");
	}
	
	/**
	 * 计算代码的过期时间点
	 * @returns 表示过期时间的Date对象
	 * 
	 * 根据当前时间和有效期，计算出用户代码具体什么时候过期
	 * 例如：如果现在是晚上8点，代码有效期15分钟，那么代码将在晚上8:15过期
	 */
	public codesExpireAt(): Date {
		return new Date(Date.now() + this.codesExpireInSeconds() * 1000);
	}
	
	/**
	 * 获取轮询间隔（秒）
	 * @returns 轮询间隔，以秒为单位
	 * @throws 如果interval字段格式不正确则抛出错误（但如果字段不存在则返回默认值5）
	 * 
	 * 设备应该每隔多少秒检查一次用户是否已经完成授权
	 * 如果没有指定，默认是5秒检查一次
	 * 太频繁地检查（小于间隔）可能会导致请求被拒绝
	 */
	public intervalSeconds(): number {
		if ("interval" in this.body) {
			if (typeof this.body.interval === "number") {
				return this.body.interval;
			}
			throw new Error("Invalid 'interval' field");
		}
		return 5; // 默认值为5秒
	}
}
