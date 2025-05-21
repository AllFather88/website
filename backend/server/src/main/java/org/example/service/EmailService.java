package org.example.service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.AssociationOverrides;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.util.Properties;

@EnableAsync
@Configuration
class MailConfig {
    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("marksumilo@gmail.com");
        mailSender.setPassword("rvgf zzxx lsle kguu");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        mailSender.setJavaMailProperties(props);
        return mailSender;
    }
}


@Service
public class EmailService {
    private final JavaMailSender mailSender;

    @Autowired
    public EmailService( JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    @Async
    public void sendEmail(String to, String subject, String text)  {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            message.setHeader("Content-Type", "text/html; charset=UTF-8");
            MimeMessageHelper helper = new MimeMessageHelper(message, true,"UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true); // true → поддержка HTML
            helper.setFrom("marksumilo@gmail.com","CarAuction");

            mailSender.send(message);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
