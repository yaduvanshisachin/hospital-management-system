package com.yadavice.youtube.hospitalManagement.service;

import com.yadavice.youtube.hospitalManagement.entity.Insurance;
import com.yadavice.youtube.hospitalManagement.entity.Patient;
import com.yadavice.youtube.hospitalManagement.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InsuranceService {

    private final PatientRepository patientRepository;

    public Patient assignInsuranceToPatient(Insurance insurance, Long patientId){
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient Not found with id: " + patientId));

        patient.setInsurance(insurance);
        insurance.setPatient(patient); // maintain bidirectional consistency

        return patient;
    }

    public Patient disaccociateInsuranceFromPatient(Long patientId){
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(()-> new EntityNotFoundException("Patient Not Found with id: " + patientId));

        patient.setInsurance(null);
        return patient;
    }
}
