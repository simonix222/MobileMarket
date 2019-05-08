package com.myaccademy.myappjh.repository;

import com.myaccademy.myappjh.domain.Ordinazione;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Ordinazione entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdinazioneRepository extends JpaRepository<Ordinazione, Long> {

}
