package com.yadavice.youtube.hospitalManagement.service;

import com.yadavice.youtube.hospitalManagement.dto.AppointmentResponseDto;
import com.yadavice.youtube.hospitalManagement.dto.CreateAppointmentRequestDto;
import com.yadavice.youtube.hospitalManagement.entity.Appointment;
import com.yadavice.youtube.hospitalManagement.entity.Doctor;
import com.yadavice.youtube.hospitalManagement.entity.Insurance;
import com.yadavice.youtube.hospitalManagement.entity.Patient;
import com.yadavice.youtube.hospitalManagement.repository.AppointmentRepository;
import com.yadavice.youtube.hospitalManagement.repository.DoctorRepository;
import com.yadavice.youtube.hospitalManagement.repository.InsuranceRepository;
import com.yadavice.youtube.hospitalManagement.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;

    public AppointmentResponseDto createNewAppointment(CreateAppointmentRequestDto createAppointmentRequestDto){
        Long doctorId = createAppointmentRequestDto.getDoctorId();
        Long patientId = createAppointmentRequestDto.getPatientId();

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new EntityNotFoundException("Doctor Not found"));

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient Not found"));

        Appointment appointment = Appointment.builder()
                .reason(createAppointmentRequestDto.getReason())
                .appointmentTime(createAppointmentRequestDto.getAppointmentTime())
                .build();

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        patient.getAppointments().add(appointment); // to maintain bidirectional consistency

        appointment = appointmentRepository.save(appointment);
        return modelMapper.map(appointment, AppointmentResponseDto.class);
    }


    public List<AppointmentResponseDto> getAllAppointmentsOfDoctor(Long doctorId){
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();

        return doctor.getAppointments()
                .stream()
                .map(appointment -> modelMapper.map(appointment, AppointmentResponseDto.class))
                .collect(Collectors.toList());
    }

    @Transactional
    @PreAuthorize("hasAuthority('appointment:write') or #doctorId == authentication.principal.id")
    public Appointment reAssignAppointmentToAnotherDoctor(Long appointmentId, Long doctorId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow();
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();

        appointment.setDoctor(doctor); // this will automatically call the update, because it is dirty

        doctor.getAppointments().add(appointment); // just for bidirectional consistency

        return appointment;
    }
}

