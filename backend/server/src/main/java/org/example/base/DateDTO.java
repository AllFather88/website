package org.example.base;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DateDTO {
    @JsonProperty("id")
    Integer id;
    LocalDateTime date;
}
