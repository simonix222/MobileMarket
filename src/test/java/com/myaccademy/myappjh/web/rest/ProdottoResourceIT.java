package com.myaccademy.myappjh.web.rest;

import com.myaccademy.myappjh.MobileMarketApp;
import com.myaccademy.myappjh.domain.Prodotto;
import com.myaccademy.myappjh.repository.ProdottoRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static com.myaccademy.myappjh.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ProdottoResource} REST controller.
 */
@SpringBootTest(classes = MobileMarketApp.class)
public class ProdottoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIZIONE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIZIONE = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PREZZO = new BigDecimal(0);
    private static final BigDecimal UPDATED_PREZZO = new BigDecimal(1);

    private static final byte[] DEFAULT_IMMAGINE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMMAGINE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMMAGINE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMMAGINE_CONTENT_TYPE = "image/png";

    @Autowired
    private ProdottoRepository prodottoRepository;

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

    private MockMvc restProdottoMockMvc;

    private Prodotto prodotto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProdottoResource prodottoResource = new ProdottoResource(prodottoRepository);
        this.restProdottoMockMvc = MockMvcBuilders.standaloneSetup(prodottoResource)
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
    public static Prodotto createEntity(EntityManager em) {
        Prodotto prodotto = new Prodotto()
            .nome(DEFAULT_NOME)
            .descrizione(DEFAULT_DESCRIZIONE)
            .prezzo(DEFAULT_PREZZO)
            .immagine(DEFAULT_IMMAGINE)
            .immagineContentType(DEFAULT_IMMAGINE_CONTENT_TYPE);
        return prodotto;
    }

    @BeforeEach
    public void initTest() {
        prodotto = createEntity(em);
    }

    @Test
    @Transactional
    public void createProdotto() throws Exception {
        int databaseSizeBeforeCreate = prodottoRepository.findAll().size();

        // Create the Prodotto
        restProdottoMockMvc.perform(post("/api/prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prodotto)))
            .andExpect(status().isCreated());

        // Validate the Prodotto in the database
        List<Prodotto> prodottoList = prodottoRepository.findAll();
        assertThat(prodottoList).hasSize(databaseSizeBeforeCreate + 1);
        Prodotto testProdotto = prodottoList.get(prodottoList.size() - 1);
        assertThat(testProdotto.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testProdotto.getDescrizione()).isEqualTo(DEFAULT_DESCRIZIONE);
        assertThat(testProdotto.getPrezzo()).isEqualTo(DEFAULT_PREZZO);
        assertThat(testProdotto.getImmagine()).isEqualTo(DEFAULT_IMMAGINE);
        assertThat(testProdotto.getImmagineContentType()).isEqualTo(DEFAULT_IMMAGINE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createProdottoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prodottoRepository.findAll().size();

        // Create the Prodotto with an existing ID
        prodotto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdottoMockMvc.perform(post("/api/prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prodotto)))
            .andExpect(status().isBadRequest());

        // Validate the Prodotto in the database
        List<Prodotto> prodottoList = prodottoRepository.findAll();
        assertThat(prodottoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = prodottoRepository.findAll().size();
        // set the field null
        prodotto.setNome(null);

        // Create the Prodotto, which fails.

        restProdottoMockMvc.perform(post("/api/prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prodotto)))
            .andExpect(status().isBadRequest());

        List<Prodotto> prodottoList = prodottoRepository.findAll();
        assertThat(prodottoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrezzoIsRequired() throws Exception {
        int databaseSizeBeforeTest = prodottoRepository.findAll().size();
        // set the field null
        prodotto.setPrezzo(null);

        // Create the Prodotto, which fails.

        restProdottoMockMvc.perform(post("/api/prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prodotto)))
            .andExpect(status().isBadRequest());

        List<Prodotto> prodottoList = prodottoRepository.findAll();
        assertThat(prodottoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProdottos() throws Exception {
        // Initialize the database
        prodottoRepository.saveAndFlush(prodotto);

        // Get all the prodottoList
        restProdottoMockMvc.perform(get("/api/prodottos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prodotto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].descrizione").value(hasItem(DEFAULT_DESCRIZIONE.toString())))
            .andExpect(jsonPath("$.[*].prezzo").value(hasItem(DEFAULT_PREZZO.intValue())))
            .andExpect(jsonPath("$.[*].immagineContentType").value(hasItem(DEFAULT_IMMAGINE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].immagine").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMMAGINE))));
    }
    
    @Test
    @Transactional
    public void getProdotto() throws Exception {
        // Initialize the database
        prodottoRepository.saveAndFlush(prodotto);

        // Get the prodotto
        restProdottoMockMvc.perform(get("/api/prodottos/{id}", prodotto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prodotto.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.descrizione").value(DEFAULT_DESCRIZIONE.toString()))
            .andExpect(jsonPath("$.prezzo").value(DEFAULT_PREZZO.intValue()))
            .andExpect(jsonPath("$.immagineContentType").value(DEFAULT_IMMAGINE_CONTENT_TYPE))
            .andExpect(jsonPath("$.immagine").value(Base64Utils.encodeToString(DEFAULT_IMMAGINE)));
    }

    @Test
    @Transactional
    public void getNonExistingProdotto() throws Exception {
        // Get the prodotto
        restProdottoMockMvc.perform(get("/api/prodottos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProdotto() throws Exception {
        // Initialize the database
        prodottoRepository.saveAndFlush(prodotto);

        int databaseSizeBeforeUpdate = prodottoRepository.findAll().size();

        // Update the prodotto
        Prodotto updatedProdotto = prodottoRepository.findById(prodotto.getId()).get();
        // Disconnect from session so that the updates on updatedProdotto are not directly saved in db
        em.detach(updatedProdotto);
        updatedProdotto
            .nome(UPDATED_NOME)
            .descrizione(UPDATED_DESCRIZIONE)
            .prezzo(UPDATED_PREZZO)
            .immagine(UPDATED_IMMAGINE)
            .immagineContentType(UPDATED_IMMAGINE_CONTENT_TYPE);

        restProdottoMockMvc.perform(put("/api/prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProdotto)))
            .andExpect(status().isOk());

        // Validate the Prodotto in the database
        List<Prodotto> prodottoList = prodottoRepository.findAll();
        assertThat(prodottoList).hasSize(databaseSizeBeforeUpdate);
        Prodotto testProdotto = prodottoList.get(prodottoList.size() - 1);
        assertThat(testProdotto.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProdotto.getDescrizione()).isEqualTo(UPDATED_DESCRIZIONE);
        assertThat(testProdotto.getPrezzo()).isEqualTo(UPDATED_PREZZO);
        assertThat(testProdotto.getImmagine()).isEqualTo(UPDATED_IMMAGINE);
        assertThat(testProdotto.getImmagineContentType()).isEqualTo(UPDATED_IMMAGINE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingProdotto() throws Exception {
        int databaseSizeBeforeUpdate = prodottoRepository.findAll().size();

        // Create the Prodotto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdottoMockMvc.perform(put("/api/prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prodotto)))
            .andExpect(status().isBadRequest());

        // Validate the Prodotto in the database
        List<Prodotto> prodottoList = prodottoRepository.findAll();
        assertThat(prodottoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProdotto() throws Exception {
        // Initialize the database
        prodottoRepository.saveAndFlush(prodotto);

        int databaseSizeBeforeDelete = prodottoRepository.findAll().size();

        // Delete the prodotto
        restProdottoMockMvc.perform(delete("/api/prodottos/{id}", prodotto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Prodotto> prodottoList = prodottoRepository.findAll();
        assertThat(prodottoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prodotto.class);
        Prodotto prodotto1 = new Prodotto();
        prodotto1.setId(1L);
        Prodotto prodotto2 = new Prodotto();
        prodotto2.setId(prodotto1.getId());
        assertThat(prodotto1).isEqualTo(prodotto2);
        prodotto2.setId(2L);
        assertThat(prodotto1).isNotEqualTo(prodotto2);
        prodotto1.setId(null);
        assertThat(prodotto1).isNotEqualTo(prodotto2);
    }
}
