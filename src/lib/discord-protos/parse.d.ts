declare function parseType(field: any): any;
declare function parseName(name: any): any;
declare function flattenField(field: any): any[];
declare function parseEnum(enun: any): {
    name: any;
    kind: string;
    values: {
        name: string;
        value: any;
    }[];
};
declare function parseProto(proto: any): {
    name: any;
    kind: string;
    fields: any[];
    structs: any[];
};
declare function extractProtos(): {};
declare function createProtoField(field: any): string;
declare function createProtoFile(proto: any): string;
declare function getModules(prop: any): any[];
declare const REAL_TYPES: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    9: string;
    12: string;
    13: string;
};
declare const protos: {};
