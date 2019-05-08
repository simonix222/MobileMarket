package com.myaccademy.myappjh.repository;

import com.myaccademy.myappjh.domain.CategoriaProdotto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CategoriaProdotto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriaProdottoRepository extends JpaRepository<CategoriaProdotto, Long> {

}
