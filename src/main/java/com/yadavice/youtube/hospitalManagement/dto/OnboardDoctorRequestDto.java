package com.yadavice.youtube.hospitalManagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OnboardDoctorRequestDto {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @NotBlank(message = "Name is required")
    private String name;
}
