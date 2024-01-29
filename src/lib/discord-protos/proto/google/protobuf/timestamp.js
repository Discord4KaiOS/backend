// @generated by protobuf-ts 2.9.3 with parameter long_type_string,output_javascript_es2015,force_optimize_code_size
// @generated from protobuf file "google/protobuf/timestamp.proto" (package "google.protobuf", syntax proto3)
// tslint:disable
//
// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// @generated by protobuf-ts 2.9.3 with parameter long_type_string,output_javascript_es2015,force_optimize_code_size
// @generated from protobuf file "google/protobuf/timestamp.proto" (package "google.protobuf", syntax proto3)
// tslint:disable
//
// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
import { typeofJsonValue } from "@protobuf-ts/runtime";
import { PbLong } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
// @generated message type with reflection information, may provide speed optimized methods
class Timestamp$Type extends MessageType {
    constructor() {
        super("google.protobuf.Timestamp", [
            { no: 1, name: "seconds", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
            { no: 2, name: "nanos", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    /**
     * Creates a new `Timestamp` for the current time.
     */
    now() {
        const msg = this.create();
        const ms = Date.now();
        msg.seconds = PbLong.from(Math.floor(ms / 1000)).toString();
        msg.nanos = (ms % 1000) * 1000000;
        return msg;
    }
    /**
     * Converts a `Timestamp` to a JavaScript Date.
     */
    toDate(message) {
        return new Date(PbLong.from(message.seconds).toNumber() * 1000 + Math.ceil(message.nanos / 1000000));
    }
    /**
     * Converts a JavaScript Date to a `Timestamp`.
     */
    fromDate(date) {
        const msg = this.create();
        const ms = date.getTime();
        msg.seconds = PbLong.from(Math.floor(ms / 1000)).toString();
        msg.nanos = (ms % 1000) * 1000000;
        return msg;
    }
    /**
     * In JSON format, the `Timestamp` type is encoded as a string
     * in the RFC 3339 format.
     */
    internalJsonWrite(message, options) {
        let ms = PbLong.from(message.seconds).toNumber() * 1000;
        if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z"))
            throw new Error("Unable to encode Timestamp to JSON. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.");
        if (message.nanos < 0)
            throw new Error("Unable to encode invalid Timestamp to JSON. Nanos must not be negative.");
        let z = "Z";
        if (message.nanos > 0) {
            let nanosStr = (message.nanos + 1000000000).toString().substring(1);
            if (nanosStr.substring(3) === "000000")
                z = "." + nanosStr.substring(0, 3) + "Z";
            else if (nanosStr.substring(6) === "000")
                z = "." + nanosStr.substring(0, 6) + "Z";
            else
                z = "." + nanosStr + "Z";
        }
        return new Date(ms).toISOString().replace(".000Z", z);
    }
    /**
     * In JSON format, the `Timestamp` type is encoded as a string
     * in the RFC 3339 format.
     */
    internalJsonRead(json, options, target) {
        if (typeof json !== "string")
            throw new Error("Unable to parse Timestamp from JSON " + typeofJsonValue(json) + ".");
        let matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
        if (!matches)
            throw new Error("Unable to parse Timestamp from JSON. Invalid format.");
        let ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));
        if (Number.isNaN(ms))
            throw new Error("Unable to parse Timestamp from JSON. Invalid value.");
        if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z"))
            throw new globalThis.Error("Unable to parse Timestamp from JSON. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.");
        if (!target)
            target = this.create();
        target.seconds = PbLong.from(ms / 1000).toString();
        target.nanos = 0;
        if (matches[7])
            target.nanos = (parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1000000000);
        return target;
    }
}
/**
 * @generated MessageType for protobuf message google.protobuf.Timestamp
 */
export const Timestamp = new Timestamp$Type();
