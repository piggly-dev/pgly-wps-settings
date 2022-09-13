export default class UUID {
	protected static lut: Array<string> = [];

	/**
	 * @link https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
	 */
	public static generate () {
		if (UUID.lut.length === 0) {
			for (let i = 0; i < 256; i++) {
				UUID.lut[i] = (i < 16 ? '0' : '') + i.toString(16);
			}
		}

		const d0 = (Math.random() * 0xffffffff) | 0;
		const d1 = (Math.random() * 0xffffffff) | 0;
		const d2 = (Math.random() * 0xffffffff) | 0;
		const d3 = (Math.random() * 0xffffffff) | 0;

		return `${
			UUID.lut[d0 & 0xff] +
			UUID.lut[(d0 >> 8) & 0xff] +
			UUID.lut[(d0 >> 16) & 0xff] +
			UUID.lut[(d0 >> 24) & 0xff]
		}-${UUID.lut[d1 & 0xff]}${UUID.lut[(d1 >> 8) & 0xff]}-${
			UUID.lut[((d1 >> 16) & 0x0f) | 0x40]
		}${UUID.lut[(d1 >> 24) & 0xff]}-${UUID.lut[(d2 & 0x3f) | 0x80]}${
			UUID.lut[(d2 >> 8) & 0xff]
		}-${UUID.lut[(d2 >> 16) & 0xff]}${UUID.lut[(d2 >> 24) & 0xff]}${
			UUID.lut[d3 & 0xff]
		}${UUID.lut[(d3 >> 8) & 0xff]}${UUID.lut[(d3 >> 16) & 0xff]}${
			UUID.lut[(d3 >> 24) & 0xff]
		}`;
	}
}
