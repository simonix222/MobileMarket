package com.myaccademy.myappjh.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A Prodotto.
 */
@Entity
@Table(name = "prodotto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Prodotto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "descrizione")
    private String descrizione;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "prezzo", precision = 21, scale = 2, nullable = false)
    private BigDecimal prezzo;

    @Lob
    @Column(name = "immagine")
    private byte[] immagine;

    @Column(name = "immagine_content_type")
    private String immagineContentType;

    @ManyToOne
    @JsonIgnoreProperties("prodottos")
    private CategoriaProdotto categoriaProdotto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Prodotto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public Prodotto descrizione(String descrizione) {
        this.descrizione = descrizione;
        return this;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public BigDecimal getPrezzo() {
        return prezzo;
    }

    public Prodotto prezzo(BigDecimal prezzo) {
        this.prezzo = prezzo;
        return this;
    }

    public void setPrezzo(BigDecimal prezzo) {
        this.prezzo = prezzo;
    }

    public byte[] getImmagine() {
        return immagine;
    }

    public Prodotto immagine(byte[] immagine) {
        this.immagine = immagine;
        return this;
    }

    public void setImmagine(byte[] immagine) {
        this.immagine = immagine;
    }

    public String getImmagineContentType() {
        return immagineContentType;
    }

    public Prodotto immagineContentType(String immagineContentType) {
        this.immagineContentType = immagineContentType;
        return this;
    }

    public void setImmagineContentType(String immagineContentType) {
        this.immagineContentType = immagineContentType;
    }

    public CategoriaProdotto getCategoriaProdotto() {
        return categoriaProdotto;
    }

    public Prodotto categoriaProdotto(CategoriaProdotto categoriaProdotto) {
        this.categoriaProdotto = categoriaProdotto;
        return this;
    }

    public void setCategoriaProdotto(CategoriaProdotto categoriaProdotto) {
        this.categoriaProdotto = categoriaProdotto;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Prodotto)) {
            return false;
        }
        return id != null && id.equals(((Prodotto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Prodotto{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descrizione='" + getDescrizione() + "'" +
            ", prezzo=" + getPrezzo() +
            ", immagine='" + getImmagine() + "'" +
            ", immagineContentType='" + getImmagineContentType() + "'" +
            "}";
    }
}
