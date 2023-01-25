import 'jest'
import {formatTimeForVideo} from "@/util/FormatVideosTime.js"

describe('Time Formatted in minutes : seconds format', () => {
    test('correctlyFormatTime() returns correct value for varying times', () => {
        
        expect(formatTimeForVideo(72)).toBe("01:12")
        expect(formatTimeForVideo(12)).toBe("00:12")
        expect(formatTimeForVideo(43)).toBe("00:43")
        expect(formatTimeForVideo(360)).toBe("06:00")
    })

})