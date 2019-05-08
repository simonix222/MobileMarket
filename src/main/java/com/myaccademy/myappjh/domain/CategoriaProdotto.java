package com.myaccademy.myappjh.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CategoriaProdotto.
 */
@Entity
@Table(name = "categoria_prodotto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CategoriaProdotto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "descrizione")
    private String descrizione;

    @OneToMany(mappedBy = "categoriaProdotto")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Prodotto> prodottos = new HashSet<>();

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

    public CategoriaProdotto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public CategoriaProdotto descrizione(String descrizione) {
        this.descrizione = descrizione;
        return this;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Set<Prodotto> getProdottos() {
        return prodottos;
    }

    public CategoriaProdotto prodottos(Set<Prodotto> prodottos) {
        this.prodottos = prodottos;
        return this;
    }

    public CategoriaProdotto addProdotto(Prodotto prodotto) {
        this.prodottos.add(prodotto);
        prodotto.setCategoriaProdotto(this);
        return this;
    }

    public CategoriaProdotto removeProdotto(Prodotto prodotto) {
        this.prodottos.remove(prodotto);
        prodotto.setCategoriaProdotto(null);
        return this;
    }

    public void setProdottos(Set<Prodotto> prodottos) {
        this.prodottos = prodottos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CategoriaProdotto)) {
            return false;
        }
        return id != null && id.equals(((CategoriaProdotto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CategoriaProdotto{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descrizione='" + getDescrizione() + "'" +
            "}";
    }
}
