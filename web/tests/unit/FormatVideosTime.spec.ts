import 'jest'
import {formatTime} from "@/models/FormatVideosTime.js"

describe('Time Formatted in minutes : seconds format', () => {
    test('formatTime() returns correct value for varying times', () => {
        
        expect(formatTime(72)).toBe("01:12")
        expect(formatTime(12)).toBe("00:12")
        expect(formatTime(43)).toBe("00:43")
        expect(formatTime(360)).toBe("06:00")
    })

})