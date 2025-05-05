import { sum } from './toBe';

test('sum은 두 숫자의 합산을 반환한다', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).not.toBe(3);
});
