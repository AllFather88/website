import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.example.base.*;
import org.example.service.EmailService;
import org.example.service.lots.Lots;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

public class LotsTest {

    @Mock
    private CarsRepository carsRepository;

    @Mock
    private UsersRepository usersRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private Lots lots;

    private Cars testCar;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        testCar = new Cars();
        testCar.setId(1);
        testCar.setBrand("Toyota");
        testCar.setModel("Corolla");
        testCar.setBid(1000);
        testCar.setHighest_bidder("user1");
    }

    @Test
    void testAddLot() {
        when(carsRepository.save(any(Cars.class))).thenReturn(testCar);

        String result = lots.addLot(List.of(), testCar);

        assertEquals("Файл загружен!", result);
        verify(carsRepository, times(1)).save(testCar);
    }

    @Test
    void testDelLot() {
        lots.delLot(1);
        verify(carsRepository, times(1)).deleteById(1);
    }



    @Test
    void testBidHigher() {
        when(carsRepository.findById(1)).thenReturn(Optional.of(testCar));
        when(usersRepository.findByName("user1")).thenReturn(new User("user1", "email@example.com","admin"));
        String result = lots.bid(1, 1500, "user2");
        assertEquals("Лот обновлён", result);
        verify(carsRepository, times(1)).save(testCar);
        verify(emailService, times(1)).sendEmail(null,  "Ваша ставка перебита",  "<h2>Вашу ставку на лот  <a href='http://localhost:3000/lot/1'>Toyota Corolla</a> перебили ставкой 1500$<h2>");
    }

    @Test
    void testBidLower() {
        when(carsRepository.findById(1)).thenReturn(Optional.of(testCar));

        String result = lots.bid(1, 900, "user2");

        assertEquals("Лот не обновлён", result);
        verify(carsRepository, never()).save(testCar);
    }

}
