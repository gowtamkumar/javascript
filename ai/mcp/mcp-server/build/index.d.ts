import "dotenv/config";
export interface ForecastPeriod {
    name?: string;
    temperature?: number;
    temperatureUnit?: string;
    windSpeed?: string;
    windDirection?: string;
    shortForecast?: string;
}
export interface AlertsResponse {
    features: AlertFeature[];
}
export interface PointsResponse {
    properties: {
        forecast?: string;
    };
}
export interface ForecastResponse {
    properties: {
        periods: ForecastPeriod[];
    };
}
export interface AlertFeature {
    properties: {
        event?: string;
        areaDesc?: string;
        severity?: string;
        status?: string;
        headline?: string;
    };
}
export declare function makeNWSRequest<T>(url: string): Promise<T | null>;
//# sourceMappingURL=index.d.ts.map