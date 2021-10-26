--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

-- Started on 2021-10-24 20:09:18 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16426)
-- Name: skaters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skaters (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    nombre character varying(25) NOT NULL,
    password character varying(25) NOT NULL,
    anos_experiencia integer NOT NULL,
    especialidad character varying(50) NOT NULL,
    foto character varying(255) NOT NULL,
    estado boolean NOT NULL
);


ALTER TABLE public.skaters OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16425)
-- Name: skaters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skaters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.skaters_id_seq OWNER TO postgres;

--
-- TOC entry 3578 (class 0 OID 0)
-- Dependencies: 209
-- Name: skaters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skaters_id_seq OWNED BY public.skaters.id;


--
-- TOC entry 3431 (class 2604 OID 16429)
-- Name: skaters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skaters ALTER COLUMN id SET DEFAULT nextval('public.skaters_id_seq'::regclass);


--
-- TOC entry 3572 (class 0 OID 16426)
-- Dependencies: 210
-- Data for Name: skaters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skaters (id, email, nombre, password, anos_experiencia, especialidad, foto, estado) FROM stdin;
1	franciscolork@gmail.com	francisco cataldo	francisco182k_	3	back flick	kataldo.jpg	t
2	jose@pepe.cl	jose pepe	123456789	12	loop	jose.jpg	f
3	alejandro@test.cl	alejandro contreras	123456789	3	manual	alejandro.jpg	t
4	emilio cataldo	emilio@bbb.cl	emiio	15	comer	emilio.jpg	f
5	valentin cataldo	valentin@kataldo.cl	valentinkataldo	20	jugar tablet	valentin.jpg	f
6	javiera	javi@fea.cl	javiera	20	cagar	kataldo.jpg	f
7	mama	mama@test.cl	mama	25	ser mama	el-sumario-el-seductor-Cabaret-cumple-50-años.jpg	f
8	test	test@test.cl	fr	10	cagar	emilio.jpg	f
9	pokemon	pokemon@poke.cl	pokepass	10	jugar pokemon	REW2WQQC2ZAUBHZSB5FDP25CAM.jpg	f
\.


--
-- TOC entry 3579 (class 0 OID 0)
-- Dependencies: 209
-- Name: skaters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skaters_id_seq', 9, true);


-- Completed on 2021-10-24 20:09:19 -03

--
-- PostgreSQL database dump complete
--

