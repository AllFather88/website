import org.example.service.authorization.Hash;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class HashTest {

    @Test
    void testHashPassword_NotNull() {
        String hashed = Hash.hashPassword("password123");
        assertNotNull(hashed, "Хешированный пароль не должен быть null");
    }

    @Test
    void testHashPassword_DifferentForDifferentInputs() {
        String hash1 = Hash.hashPassword("password123");
        String hash2 = Hash.hashPassword("anotherPassword");
        assertNotEquals(hash1, hash2, "Хеши должны отличаться для разных входных данных");
    }

    @Test
    void testHashPassword_SameForSameInput() {
        String hash1 = Hash.hashPassword("password123");
        String hash2 = Hash.hashPassword("password123");
        assertEquals(hash1, hash2, "Хеши должны совпадать для одинаковых входных данных");
    }

    @Test
    void testHashPassword_EmptyString() {
        String hash = Hash.hashPassword("");
        assertNotNull(hash, "Хеширование пустой строки не должно возвращать null");
    }

    @Test
    void testHashPassword_NullInput() {
        String hash = Hash.hashPassword(null);
        assertNull(hash, "Хеширование `null` должно возвращать `null`");
    }
}
