export const schema: string | undefined;
export const documents: string[];
export const generates: {
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
