import static org.junit.jupiter.api.Assertions.*;
import io.jsonwebtoken.Claims;
import org.example.service.JWT.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class JwtServiceTest {

    private String testToken;
    private String testRefreshToken;

    @BeforeEach
    void setUp() {
        testToken = JwtService.generateJWT("Mark", "USER");
        testRefreshToken = JwtService.generateRefreshJWT("Mark", "USER");
    }

    @Test
    void testGenerateJWT() {
        assertNotNull(testToken);
        assertTrue(testToken.length() > 10);
    }

    @Test
    void testGenerateRefreshJWT() {
        assertNotNull(testRefreshToken);
        assertTrue(testRefreshToken.length() > 10);
    }

    @Test
    void testValidateJWT() {
        assertTrue(JwtService.validateJWT(testToken));
        assertFalse(JwtService.validateJWT("invalid_token"));
    }

    @Test
    void testExtractClaims() {
        Claims claims = JwtService.extractClaims(testToken);
        assertEquals("Mark", claims.getSubject());
        assertEquals("USER", claims.get("role"));
    }

    @Test
    void testRightsCheck() {
        assertTrue(JwtService.rightsСheck("USER", testToken));
        assertFalse(JwtService.rightsСheck("ADMIN", testToken));
    }

    @Test
    void testGetNewToken_Valid() {
        String newToken = JwtService.getNewToken(testToken);
        assertNotEquals("session is over", newToken);
        assertTrue(JwtService.validateJWT(newToken));
    }

    @Test
    void testGetNewToken_Invalid() {
        String newToken = JwtService.getNewToken("invalid_token");
        assertEquals("session is over", newToken);
    }
}
