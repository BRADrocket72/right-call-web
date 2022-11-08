import 'jest'
import {correctlyFormatTime} from "@/models/FormatVideosTime.js"

describe('Time Formatted in minutes : seconds format', () => {
    test('correctlyFormatTime() returns correct value for varying times', () => {
        
        expect(correctlyFormatTime(72)).toBe("01:12")
        expect(correctlyFormatTime(12)).toBe("00:12")
        expect(correctlyFormatTime(43)).toBe("00:43")
        expect(correctlyFormatTime(360)).toBe("06:00")
    })

})