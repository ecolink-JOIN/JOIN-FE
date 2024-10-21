export declare namespace HttpRequestConfig {
  interface Get {
    params?: Record<string, any>;
    headers?: Record<string, string>;
  }

  interface Post {
    data?: any;
    headers?: Record<string, string>;
  }

  interface Put {
    data?: any;
    headers?: Record<string, string>;
  }

  interface Delete {
    headers?: Record<string, string>;
  }
}
