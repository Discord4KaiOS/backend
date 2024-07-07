import { PermissionFlagsBits } from "discord-api-types/v10";
import JSBI from "jsbi";

JSBI.BigInt(2);

let e = "export const PermissionFlagsBits = { ";

for (const key in PermissionFlagsBits) {
	const val = PermissionFlagsBits[key];
	e = e + ` ${key}: JSBI.BigInt(${Number(val)}),\n`;
}

e = e + `}`;

console.log(e);
