import Logger from "../../utils/Logger";

type APISuccessfulResponse<T> = {
  status: number;
  data: T;
  hasError: false;
};

type APIErrorResponse<T> = {
  status: number;
  data?: T;
  error: string;
  hasError: true;
};
export type APIResponse<T> = APIErrorResponse<T> | APISuccessfulResponse<T>;

export default class APIService {
  protected static BASE_URL = "";

  protected static PATH: string;

  // Metodo aplicable a todos los metodos http
  private static async doFetch<T>(
    method: string,
    path: string,
    params?: string,
    body?: any,
  ): Promise<APIResponse<T>> {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");

    const url = `${this.BASE_URL}${this.PATH || ""}${path || ""}${
      params ? "?" + params : ""
    }`;
    try {
      const res = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });

      const responseBody = await res.json();
      if (res.ok) {
        return {
          status: res.status,
          data: responseBody as T,
          hasError: false,
        } as APISuccessfulResponse<T>;
      }
      return {
        status: res.status,
        error: responseBody["error"] || "unknown",
        hasError: true,
      } as APIErrorResponse<T>;
    } catch (err) {
      Logger.danger(err);
      return { status: 400, hasError: true, error: "unknown" };
    }
  }

  protected static get<T>(path: string, params?: string) {
    return this.doFetch<T>("GET", path, params);
  }

}
