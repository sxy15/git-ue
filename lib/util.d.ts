export declare function getConfig(hasCurrent?: boolean): Promise<{
    config: any;
    current: any;
}>;
export declare function setConfig(config: Record<string, any>, current?: string): Promise<void>;
export declare function renameKey(config: Record<string, any>, oldKey: string, newKey: string): Record<string, any>;
