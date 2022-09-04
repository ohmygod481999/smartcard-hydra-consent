export interface KratosIdentity {
    id: string;
    schema_id: string;
    schema_url: string;
    state: string;
    traits: any;
    verifiable_addresses: any[];
    recovery_addresses: any[];
    created_at: string;
    updated_at: string;
}