package com.myaccademy.myappjh.repository;

import com.myaccademy.myappjh.domain.OrdineProdotto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrdineProdotto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdineProdottoRepository extends JpaRepository<OrdineProdotto, Long> {

}
