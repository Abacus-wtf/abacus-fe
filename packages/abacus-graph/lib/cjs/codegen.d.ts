export declare const schema: string | undefined;
export declare const documents: string[];
export declare const generates: {
    "./index.ts": {
        plugins: string[];
        config: {
            withHooks: boolean;
            scalars: {
                BigInt: string;
                BigDecimal: string;
            };
        };
    };
};
