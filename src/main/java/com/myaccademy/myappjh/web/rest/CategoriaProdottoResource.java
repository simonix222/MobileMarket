package com.myaccademy.myappjh.web.rest;

import com.myaccademy.myappjh.domain.CategoriaProdotto;
import com.myaccademy.myappjh.repository.CategoriaProdottoRepository;
import com.myaccademy.myappjh.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.myaccademy.myappjh.domain.CategoriaProdotto}.
 */
@RestController
@RequestMapping("/api")
public class CategoriaProdottoResource {

    private final Logger log = LoggerFactory.getLogger(CategoriaProdottoResource.class);

    private static final String ENTITY_NAME = "categoriaProdotto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CategoriaProdottoRepository categoriaProdottoRepository;

    public CategoriaProdottoResource(CategoriaProdottoRepository categoriaProdottoRepository) {
        this.categoriaProdottoRepository = categoriaProdottoRepository;
    }

    /**
     * {@code POST  /categoria-prodottos} : Create a new categoriaProdotto.
     *
     * @param categoriaProdotto the categoriaProdotto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new categoriaProdotto, or with status {@code 400 (Bad Request)} if the categoriaProdotto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/categoria-prodottos")
    public ResponseEntity<CategoriaProdotto> createCategoriaProdotto(@Valid @RequestBody CategoriaProdotto categoriaProdotto) throws URISyntaxException {
        log.debug("REST request to save CategoriaProdotto : {}", categoriaProdotto);
        if (categoriaProdotto.getId() != null) {
            throw new BadRequestAlertException("A new categoriaProdotto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CategoriaProdotto result = categoriaProdottoRepository.save(categoriaProdotto);
        return ResponseEntity.created(new URI("/api/categoria-prodottos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /categoria-prodottos} : Updates an existing categoriaProdotto.
     *
     * @param categoriaProdotto the categoriaProdotto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated categoriaProdotto,
     * or with status {@code 400 (Bad Request)} if the categoriaProdotto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the categoriaProdotto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/categoria-prodottos")
    public ResponseEntity<CategoriaProdotto> updateCategoriaProdotto(@Valid @RequestBody CategoriaProdotto categoriaProdotto) throws URISyntaxException {
        log.debug("REST request to update CategoriaProdotto : {}", categoriaProdotto);
        if (categoriaProdotto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CategoriaProdotto result = categoriaProdottoRepository.save(categoriaProdotto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, categoriaProdotto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /categoria-prodottos} : get all the categoriaProdottos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of categoriaProdottos in body.
     */
    @GetMapping("/categoria-prodottos")
    public List<CategoriaProdotto> getAllCategoriaProdottos() {
        log.debug("REST request to get all CategoriaProdottos");
        return categoriaProdottoRepository.findAll();
    }

    /**
     * {@code GET  /categoria-prodottos/:id} : get the "id" categoriaProdotto.
     *
     * @param id the id of the categoriaProdotto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the categoriaProdotto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/categoria-prodottos/{id}")
    public ResponseEntity<CategoriaProdotto> getCategoriaProdotto(@PathVariable Long id) {
        log.debug("REST request to get CategoriaProdotto : {}", id);
        Optional<CategoriaProdotto> categoriaProdotto = categoriaProdottoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(categoriaProdotto);
    }

    /**
     * {@code DELETE  /categoria-prodottos/:id} : delete the "id" categoriaProdotto.
     *
     * @param id the id of the categoriaProdotto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/categoria-prodottos/{id}")
    public ResponseEntity<Void> deleteCategoriaProdotto(@PathVariable Long id) {
        log.debug("REST request to delete CategoriaProdotto : {}", id);
        categoriaProdottoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
