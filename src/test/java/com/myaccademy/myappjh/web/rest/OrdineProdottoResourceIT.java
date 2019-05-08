package com.myaccademy.myappjh.web.rest;

import com.myaccademy.myappjh.MobileMarketApp;
import com.myaccademy.myappjh.domain.OrdineProdotto;
import com.myaccademy.myappjh.domain.Cliente;
import com.myaccademy.myappjh.repository.OrdineProdottoRepository;
import com.myaccademy.myappjh.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.myaccademy.myappjh.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.myaccademy.myappjh.domain.enumeration.StatoOrdine;
/**
 * Integration tests for the {@Link OrdineProdottoResource} REST controller.
 */
@SpringBootTest(classes = MobileMarketApp.class)
public class OrdineProdottoResourceIT {

    private static final Instant DEFAULT_DATA_INSERIMENTO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_INSERIMENTO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final StatoOrdine DEFAULT_STATO = StatoOrdine.COMPLETATO;
    private static final StatoOrdine UPDATED_STATO = StatoOrdine.IN_ATTESA;

    private static final String DEFAULT_CODICE = "AAAAAAAAAA";
    private static final String UPDATED_CODICE = "BBBBBBBBBB";

    @Autowired
    private OrdineProdottoRepository ordineProdottoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restOrdineProdottoMockMvc;

    private OrdineProdotto ordineProdotto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdineProdottoResource ordineProdottoResource = new OrdineProdottoResource(ordineProdottoRepository);
        this.restOrdineProdottoMockMvc = MockMvcBuilders.standaloneSetup(ordineProdottoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrdineProdotto createEntity(EntityManager em) {
        OrdineProdotto ordineProdotto = new OrdineProdotto()
            .dataInserimento(DEFAULT_DATA_INSERIMENTO)
            .stato(DEFAULT_STATO)
            .codice(DEFAULT_CODICE);
        // Add required entity
        Cliente cliente = ClienteResourceIT.createEntity(em);
        em.persist(cliente);
        em.flush();
        ordineProdotto.setCliente(cliente);
        return ordineProdotto;
    }

    @BeforeEach
    public void initTest() {
        ordineProdotto = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdineProdotto() throws Exception {
        int databaseSizeBeforeCreate = ordineProdottoRepository.findAll().size();

        // Create the OrdineProdotto
        restOrdineProdottoMockMvc.perform(post("/api/ordine-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordineProdotto)))
            .andExpect(status().isCreated());

        // Validate the OrdineProdotto in the database
        List<OrdineProdotto> ordineProdottoList = ordineProdottoRepository.findAll();
        assertThat(ordineProdottoList).hasSize(databaseSizeBeforeCreate + 1);
        OrdineProdotto testOrdineProdotto = ordineProdottoList.get(ordineProdottoList.size() - 1);
        assertThat(testOrdineProdotto.getDataInserimento()).isEqualTo(DEFAULT_DATA_INSERIMENTO);
        assertThat(testOrdineProdotto.getStato()).isEqualTo(DEFAULT_STATO);
        assertThat(testOrdineProdotto.getCodice()).isEqualTo(DEFAULT_CODICE);
    }

    @Test
    @Transactional
    public void createOrdineProdottoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordineProdottoRepository.findAll().size();

        // Create the OrdineProdotto with an existing ID
        ordineProdotto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdineProdottoMockMvc.perform(post("/api/ordine-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordineProdotto)))
            .andExpect(status().isBadRequest());

        // Validate the OrdineProdotto in the database
        List<OrdineProdotto> ordineProdottoList = ordineProdottoRepository.findAll();
        assertThat(ordineProdottoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDataInserimentoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordineProdottoRepository.findAll().size();
        // set the field null
        ordineProdotto.setDataInserimento(null);

        // Create the OrdineProdotto, which fails.

        restOrdineProdottoMockMvc.perform(post("/api/ordine-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordineProdotto)))
            .andExpect(status().isBadRequest());

        List<OrdineProdotto> ordineProdottoList = ordineProdottoRepository.findAll();
        assertThat(ordineProdottoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordineProdottoRepository.findAll().size();
        // set the field null
        ordineProdotto.setStato(null);

        // Create the OrdineProdotto, which fails.

        restOrdineProdottoMockMvc.perform(post("/api/ordine-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordineProdotto)))
            .andExpect(status().isBadRequest());

        List<OrdineProdotto> ordineProdottoList = ordineProdottoRepository.findAll();
        assertThat(ordineProdottoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodiceIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordineProdottoRepository.findAll().size();
        // set the field null
        ordineProdotto.setCodice(null);

        // Create the OrdineProdotto, which fails.

        restOrdineProdottoMockMvc.perform(post("/api/ordine-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordineProdotto)))
            .andExpect(status().isBadRequest());

        List<OrdineProdotto> ordineProdottoList = ordineProdottoRepository.findAll();
        assertThat(ordineProdottoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrdineProdottos() throws Exception {
        // Initialize the database
        ordineProdottoRepository.saveAndFlush(ordineProdotto);

        // Get all the ordineProdottoList
        restOrdineProdottoMockMvc.perform(get("/api/ordine-prodottos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordineProdotto.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataInserimento").value(hasItem(DEFAULT_DATA_INSERIMENTO.toString())))
            .andExpect(jsonPath("$.[*].stato").value(hasItem(DEFAULT_STATO.toString())))
            .andExpect(jsonPath("$.[*].codice").value(hasItem(DEFAULT_CODICE.toString())));
    }
    
    @Test
    @Transactional
    public void getOrdineProdotto() throws Exception {
        // Initialize the database
        ordineProdottoRepository.saveAndFlush(ordineProdotto);

        // Get the ordineProdotto
        restOrdineProdottoMockMvc.perform(get("/api/ordine-prodottos/{id}", ordineProdotto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordineProdotto.getId().intValue()))
            .andExpect(jsonPath("$.dataInserimento").value(DEFAULT_DATA_INSERIMENTO.toString()))
            .andExpect(jsonPath("$.stato").value(DEFAULT_STATO.toString()))
            .andExpect(jsonPath("$.codice").value(DEFAULT_CODICE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdineProdotto() throws Exception {
        // Get the ordineProdotto
        restOrdineProdottoMockMvc.perform(get("/api/ordine-prodottos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdineProdotto() throws Exception {
        // Initialize the database
        ordineProdottoRepository.saveAndFlush(ordineProdotto);

        int databaseSizeBeforeUpdate = ordineProdottoRepository.findAll().size();

        // Update the ordineProdotto
        OrdineProdotto updatedOrdineProdotto = ordineProdottoRepository.findById(ordineProdotto.getId()).get();
        // Disconnect from session so that the updates on updatedOrdineProdotto are not directly saved in db
        em.detach(updatedOrdineProdotto);
        updatedOrdineProdotto
            .dataInserimento(UPDATED_DATA_INSERIMENTO)
            .stato(UPDATED_STATO)
            .codice(UPDATED_CODICE);

        restOrdineProdottoMockMvc.perform(put("/api/ordine-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdineProdotto)))
            .andExpect(status().isOk());

        // Validate the OrdineProdotto in the database
        List<OrdineProdotto> ordineProdottoList = ordineProdottoRepository.findAll();
        assertThat(ordineProdottoList).hasSize(databaseSizeBeforeUpdate);
        OrdineProdotto testOrdineProdotto = ordineProdottoList.get(ordineProdottoList.size() - 1);
        assertThat(testOrdineProdotto.getDataInserimento()).isEqualTo(UPDATED_DATA_INSERIMENTO);
        assertThat(testOrdineProdotto.getStato()).isEqualTo(UPDATED_STATO);
        assertThat(testOrdineProdotto.getCodice()).isEqualTo(UPDATED_CODICE);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdineProdotto() throws Exception {
        int databaseSizeBeforeUpdate = ordineProdottoRepository.findAll().size();

        // Create the OrdineProdotto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrdineProdottoMockMvc.perform(put("/api/ordine-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordineProdotto)))
            .andExpect(status().isBadRequest());

        // Validate the OrdineProdotto in the database
        List<OrdineProdotto> ordineProdottoList = ordineProdottoRepository.findAll();
        assertThat(ordineProdottoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrdineProdotto() throws Exception {
        // Initialize the database
        ordineProdottoRepository.saveAndFlush(ordineProdotto);

        int databaseSizeBeforeDelete = ordineProdottoRepository.findAll().size();

        // Delete the ordineProdotto
        restOrdineProdottoMockMvc.perform(delete("/api/ordine-prodottos/{id}", ordineProdotto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<OrdineProdotto> ordineProdottoList = ordineProdottoRepository.findAll();
        assertThat(ordineProdottoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrdineProdotto.class);
        OrdineProdotto ordineProdotto1 = new OrdineProdotto();
        ordineProdotto1.setId(1L);
        OrdineProdotto ordineProdotto2 = new OrdineProdotto();
        ordineProdotto2.setId(ordineProdotto1.getId());
        assertThat(ordineProdotto1).isEqualTo(ordineProdotto2);
        ordineProdotto2.setId(2L);
        assertThat(ordineProdotto1).isNotEqualTo(ordineProdotto2);
        ordineProdotto1.setId(null);
        assertThat(ordineProdotto1).isNotEqualTo(ordineProdotto2);
    }
}
