package com.myaccademy.myappjh.web.rest;

import com.myaccademy.myappjh.domain.OrdineProdotto;
import com.myaccademy.myappjh.repository.OrdineProdottoRepository;
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
 * REST controller for managing {@link com.myaccademy.myappjh.domain.OrdineProdotto}.
 */
@RestController
@RequestMapping("/api")
public class OrdineProdottoResource {

    private final Logger log = LoggerFactory.getLogger(OrdineProdottoResource.class);

    private static final String ENTITY_NAME = "ordineProdotto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrdineProdottoRepository ordineProdottoRepository;

    public OrdineProdottoResource(OrdineProdottoRepository ordineProdottoRepository) {
        this.ordineProdottoRepository = ordineProdottoRepository;
    }

    /**
     * {@code POST  /ordine-prodottos} : Create a new ordineProdotto.
     *
     * @param ordineProdotto the ordineProdotto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ordineProdotto, or with status {@code 400 (Bad Request)} if the ordineProdotto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ordine-prodottos")
    public ResponseEntity<OrdineProdotto> createOrdineProdotto(@Valid @RequestBody OrdineProdotto ordineProdotto) throws URISyntaxException {
        log.debug("REST request to save OrdineProdotto : {}", ordineProdotto);
        if (ordineProdotto.getId() != null) {
            throw new BadRequestAlertException("A new ordineProdotto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrdineProdotto result = ordineProdottoRepository.save(ordineProdotto);
        return ResponseEntity.created(new URI("/api/ordine-prodottos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ordine-prodottos} : Updates an existing ordineProdotto.
     *
     * @param ordineProdotto the ordineProdotto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ordineProdotto,
     * or with status {@code 400 (Bad Request)} if the ordineProdotto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ordineProdotto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ordine-prodottos")
    public ResponseEntity<OrdineProdotto> updateOrdineProdotto(@Valid @RequestBody OrdineProdotto ordineProdotto) throws URISyntaxException {
        log.debug("REST request to update OrdineProdotto : {}", ordineProdotto);
        if (ordineProdotto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrdineProdotto result = ordineProdottoRepository.save(ordineProdotto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ordineProdotto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ordine-prodottos} : get all the ordineProdottos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ordineProdottos in body.
     */
    @GetMapping("/ordine-prodottos")
    public List<OrdineProdotto> getAllOrdineProdottos() {
        log.debug("REST request to get all OrdineProdottos");
        return ordineProdottoRepository.findAll();
    }

    /**
     * {@code GET  /ordine-prodottos/:id} : get the "id" ordineProdotto.
     *
     * @param id the id of the ordineProdotto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ordineProdotto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ordine-prodottos/{id}")
    public ResponseEntity<OrdineProdotto> getOrdineProdotto(@PathVariable Long id) {
        log.debug("REST request to get OrdineProdotto : {}", id);
        Optional<OrdineProdotto> ordineProdotto = ordineProdottoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ordineProdotto);
    }

    /**
     * {@code DELETE  /ordine-prodottos/:id} : delete the "id" ordineProdotto.
     *
     * @param id the id of the ordineProdotto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ordine-prodottos/{id}")
    public ResponseEntity<Void> deleteOrdineProdotto(@PathVariable Long id) {
        log.debug("REST request to delete OrdineProdotto : {}", id);
        ordineProdottoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
