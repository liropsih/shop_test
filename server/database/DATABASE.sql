--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2021-06-24 14:22:07 +05

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
-- TOC entry 225 (class 1259 OID 32415)
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 32413)
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brands_id_seq OWNER TO postgres;

--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 224
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- TOC entry 229 (class 1259 OID 32451)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    count integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "cartId" integer,
    "itemId" integer
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 32449)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_items_id_seq OWNER TO postgres;

--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 228
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 221 (class 1259 OID 32387)
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 32385)
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_id_seq OWNER TO postgres;

--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 220
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 239 (class 1259 OID 32538)
-- Name: cat_brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_brands (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "itemId" integer,
    "brandId" integer
);


ALTER TABLE public.cat_brands OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 32536)
-- Name: cat_brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cat_brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cat_brands_id_seq OWNER TO postgres;

--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 238
-- Name: cat_brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cat_brands_id_seq OWNED BY public.cat_brands.id;


--
-- TOC entry 223 (class 1259 OID 32400)
-- Name: cats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cats (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "parentId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.cats OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 32398)
-- Name: cats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cats_id_seq OWNER TO postgres;

--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 222
-- Name: cats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cats_id_seq OWNED BY public.cats.id;


--
-- TOC entry 237 (class 1259 OID 32522)
-- Name: item_infos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_infos (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "itemId" integer
);


ALTER TABLE public.item_infos OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 32520)
-- Name: item_infos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_infos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_infos_id_seq OWNER TO postgres;

--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 236
-- Name: item_infos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_infos_id_seq OWNED BY public.item_infos.id;


--
-- TOC entry 227 (class 1259 OID 32425)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    "oldPrice" integer,
    sale boolean DEFAULT false,
    sale_tag character varying(255) DEFAULT 'SALE'::character varying NOT NULL,
    rating integer DEFAULT 0,
    img character varying(255) NOT NULL,
    count integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "catId" integer,
    "brandId" integer
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 32423)
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO postgres;

--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 226
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- TOC entry 233 (class 1259 OID 32484)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "orderId" integer,
    "itemId" integer
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 32482)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_items_id_seq OWNER TO postgres;

--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 232
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 231 (class 1259 OID 32471)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 32469)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 230
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 235 (class 1259 OID 32504)
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    id integer NOT NULL,
    rate integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "itemId" integer
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 32502)
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_id_seq OWNER TO postgres;

--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 234
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- TOC entry 219 (class 1259 OID 32367)
-- Name: request_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request_roles (
    id integer NOT NULL,
    "requestId" integer,
    "roleId" integer
);


ALTER TABLE public.request_roles OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 32365)
-- Name: request_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.request_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.request_roles_id_seq OWNER TO postgres;

--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 218
-- Name: request_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.request_roles_id_seq OWNED BY public.request_roles.id;


--
-- TOC entry 217 (class 1259 OID 32352)
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requests (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.requests OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 32350)
-- Name: requests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.requests_id_seq OWNER TO postgres;

--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 216
-- Name: requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requests_id_seq OWNED BY public.requests.id;


--
-- TOC entry 213 (class 1259 OID 32322)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 32320)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 212
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 215 (class 1259 OID 32332)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "roleId" integer
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 32330)
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_roles_id_seq OWNER TO postgres;

--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 214
-- Name: user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_id_seq OWNED BY public.user_roles.id;


--
-- TOC entry 211 (class 1259 OID 32309)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255),
    lastname character varying(255),
    patronymic character varying(255),
    phone character varying(255),
    birthdate date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 32307)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 210
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3222 (class 2604 OID 32418)
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 32454)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 3220 (class 2604 OID 32390)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 32541)
-- Name: cat_brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_brands ALTER COLUMN id SET DEFAULT nextval('public.cat_brands_id_seq'::regclass);


--
-- TOC entry 3221 (class 2604 OID 32403)
-- Name: cats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cats ALTER COLUMN id SET DEFAULT nextval('public.cats_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 32525)
-- Name: item_infos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_infos ALTER COLUMN id SET DEFAULT nextval('public.item_infos_id_seq'::regclass);


--
-- TOC entry 3223 (class 2604 OID 32428)
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 32487)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 3228 (class 2604 OID 32474)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 32507)
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- TOC entry 3219 (class 2604 OID 32370)
-- Name: request_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_roles ALTER COLUMN id SET DEFAULT nextval('public.request_roles_id_seq'::regclass);


--
-- TOC entry 3218 (class 2604 OID 32355)
-- Name: requests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests ALTER COLUMN id SET DEFAULT nextval('public.requests_id_seq'::regclass);


--
-- TOC entry 3216 (class 2604 OID 32325)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3217 (class 2604 OID 32335)
-- Name: user_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN id SET DEFAULT nextval('public.user_roles_id_seq'::regclass);


--
-- TOC entry 3215 (class 2604 OID 32312)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3450 (class 0 OID 32415)
-- Dependencies: 225
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (id, name, "createdAt", "updatedAt") FROM stdin;
1	Lenovo	2021-06-23 18:24:52.333+05	2021-06-23 18:24:52.333+05
2	LG	2021-06-23 18:24:52.374+05	2021-06-23 18:24:52.374+05
3	Samsung	2021-06-23 18:24:52.381+05	2021-06-23 18:24:52.381+05
4	Apple	2021-06-23 18:24:52.388+05	2021-06-23 18:24:52.388+05
5	HP	2021-06-23 18:24:52.395+05	2021-06-23 18:24:52.395+05
\.


--
-- TOC entry 3454 (class 0 OID 32451)
-- Dependencies: 229
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, count, "createdAt", "updatedAt", "cartId", "itemId") FROM stdin;
\.


--
-- TOC entry 3446 (class 0 OID 32387)
-- Dependencies: 221
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, "createdAt", "updatedAt", "userId") FROM stdin;
1	2021-06-23 18:24:52.1+05	2021-06-23 18:24:52.1+05	1
\.


--
-- TOC entry 3464 (class 0 OID 32538)
-- Dependencies: 239
-- Data for Name: cat_brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_brands (id, "createdAt", "updatedAt", "itemId", "brandId") FROM stdin;
\.


--
-- TOC entry 3448 (class 0 OID 32400)
-- Dependencies: 223
-- Data for Name: cats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cats (id, name, "parentId", "createdAt", "updatedAt") FROM stdin;
1	Смартфоны и гаджеты	\N	2021-06-23 18:24:52.114+05	2021-06-23 18:24:52.114+05
2	Телевизоры и мультимедиа	\N	2021-06-23 18:24:52.13+05	2021-06-23 18:24:52.13+05
3	Компьютеры и офисная техника	\N	2021-06-23 18:24:52.142+05	2021-06-23 18:24:52.142+05
4	Игры и развлечения	\N	2021-06-23 18:24:52.151+05	2021-06-23 18:24:52.151+05
5	Бытовая и кухонная техника	\N	2021-06-23 18:24:52.195+05	2021-06-23 18:24:52.195+05
6	Смартфоны	1	2021-06-23 18:24:52.205+05	2021-06-23 18:24:52.205+05
7	Планшеты	1	2021-06-23 18:24:52.213+05	2021-06-23 18:24:52.213+05
8	Смарт-часы	1	2021-06-23 18:24:52.224+05	2021-06-23 18:24:52.224+05
9	Аксессуары	1	2021-06-23 18:24:52.229+05	2021-06-23 18:24:52.229+05
10	Телевизоры	2	2021-06-23 18:24:52.236+05	2021-06-23 18:24:52.236+05
11	Домашние кинотеатры	2	2021-06-23 18:24:52.241+05	2021-06-23 18:24:52.241+05
12	ТВ приставки	2	2021-06-23 18:24:52.246+05	2021-06-23 18:24:52.246+05
13	Стационарные компьютеры	3	2021-06-23 18:24:52.255+05	2021-06-23 18:24:52.255+05
14	Ноутбуки	3	2021-06-23 18:24:52.26+05	2021-06-23 18:24:52.26+05
15	Моноблоки	3	2021-06-23 18:24:52.265+05	2021-06-23 18:24:52.265+05
16	Комплектующие	3	2021-06-23 18:24:52.273+05	2021-06-23 18:24:52.273+05
17	Офисная техника	3	2021-06-23 18:24:52.278+05	2021-06-23 18:24:52.278+05
18	Игровые консоли	4	2021-06-23 18:24:52.286+05	2021-06-23 18:24:52.286+05
19	Игры	4	2021-06-23 18:24:52.292+05	2021-06-23 18:24:52.292+05
20	Настольные игры	4	2021-06-23 18:24:52.297+05	2021-06-23 18:24:52.297+05
21	Холодильники	5	2021-06-23 18:24:52.304+05	2021-06-23 18:24:52.304+05
22	Стиральные машины	5	2021-06-23 18:24:52.308+05	2021-06-23 18:24:52.308+05
23	Посудомоечные машины	5	2021-06-23 18:24:52.312+05	2021-06-23 18:24:52.312+05
24	Микроволновые печи	5	2021-06-23 18:24:52.319+05	2021-06-23 18:24:52.319+05
25	Пылесосы	5	2021-06-23 18:24:52.323+05	2021-06-23 18:24:52.323+05
\.


--
-- TOC entry 3462 (class 0 OID 32522)
-- Dependencies: 237
-- Data for Name: item_infos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_infos (id, title, description, "createdAt", "updatedAt", "itemId") FROM stdin;
4	Диагональ	32"	2021-06-23 18:36:30.426+05	2021-06-23 18:36:30.426+05	2
5	Разрешение	FullHD	2021-06-23 18:36:30.427+05	2021-06-23 18:36:30.427+05	2
6	Тип матрицы	IPS	2021-06-23 18:37:45.1+05	2021-06-23 18:37:45.1+05	3
7	Вес	7кг	2021-06-23 18:53:21.79+05	2021-06-23 18:53:21.79+05	1
8	Диагональ	32"	2021-06-23 18:53:21.791+05	2021-06-23 18:53:21.791+05	1
9	Разрешение	FullHD	2021-06-23 18:53:21.791+05	2021-06-23 18:53:21.791+05	1
10	Цвет	Серый	2021-06-23 18:58:20.664+05	2021-06-23 18:58:20.664+05	4
11	Вес	7кг	2021-06-23 18:58:20.664+05	2021-06-23 18:58:20.664+05	4
12	Вес	8кг	2021-06-23 18:59:20.01+05	2021-06-23 18:59:20.01+05	5
13	Цвет	Чёрный	2021-06-23 18:59:20.01+05	2021-06-23 18:59:20.01+05	5
14	Тип матрицы	IPS	2021-06-23 18:59:20.01+05	2021-06-23 18:59:20.01+05	5
15	Разрешение	4K	2021-06-23 18:59:20.01+05	2021-06-23 18:59:20.01+05	5
16	Цвет	Серый	2021-06-23 18:59:55.905+05	2021-06-23 18:59:55.905+05	6
17	Вес	7кг	2021-06-23 18:59:55.905+05	2021-06-23 18:59:55.905+05	6
18	Цвет	Чёрный	2021-06-23 19:00:37.02+05	2021-06-23 19:00:37.02+05	7
19			2021-06-23 19:01:19.857+05	2021-06-23 19:01:19.857+05	8
20	Разрешение	100K	2021-06-23 19:03:08.597+05	2021-06-23 19:03:08.597+05	13
23	Разрешение	HD	2021-06-23 19:04:25.264+05	2021-06-23 19:04:25.264+05	15
24	Тип матрицы	TN-Film	2021-06-23 19:04:25.264+05	2021-06-23 19:04:25.264+05	15
47	Разрешение	8К	2021-06-24 00:32:34.382+05	2021-06-24 00:32:34.382+05	14
48	Матрица	LED	2021-06-24 00:32:34.382+05	2021-06-24 00:32:34.382+05	14
\.


--
-- TOC entry 3452 (class 0 OID 32425)
-- Dependencies: 227
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, name, price, "oldPrice", sale, sale_tag, rating, img, count, "createdAt", "updatedAt", "catId", "brandId") FROM stdin;
2	Телевизор №2	32222	\N	f	SALE	0	4565e236-13b6-4a79-b247-59207a3217df.jpg	3	2021-06-23 18:36:30.419+05	2021-06-23 18:36:30.419+05	10	2
3	Телевизор №3	44000	\N	f	SALE	0	8f9facc7-1f92-4f7c-a28c-7096dc988aa3.jpg	4	2021-06-23 18:37:45.093+05	2021-06-23 18:37:45.093+05	10	2
1	Телевизор №1	23000	49000	t	Скидка	0	bba9661a-0f8b-40c6-a44f-79517a189bc4.jpg	4	2021-06-23 18:33:06.954+05	2021-06-23 18:53:21.792+05	10	2
4	Телевизор №4	44000	\N	f	SALE	0	2f466b3d-828d-407c-9b18-2d9b5ecd899f.jpg	4	2021-06-23 18:58:20.658+05	2021-06-23 18:58:20.658+05	10	2
5	Телевизор №5	27000	\N	f	SALE	0	7a431fe5-2554-4906-8479-25d59a0df5b2.jpg	5	2021-06-23 18:59:20.001+05	2021-06-23 18:59:20.001+05	10	3
6	Телевизор №6	144000	\N	f	SALE	0	3dc69c81-fea6-49a4-b951-9a0d152d1975.jpg	5	2021-06-23 18:59:55.892+05	2021-06-23 18:59:55.892+05	10	3
7	Телевизор №7	130000	\N	f	SALE	0	c09b2738-9bb1-4117-bfbf-79a99a415979.jpg	3	2021-06-23 19:00:37.006+05	2021-06-23 19:00:37.006+05	10	3
8	Телевизор №8	56000	\N	f	SALE	0	9be706b0-aa9e-4750-a045-f96c34d58bc9.jpg	4	2021-06-23 19:01:19.848+05	2021-06-23 19:01:19.848+05	10	2
9	Телевизор №9	47000	\N	f	SALE	0	e9c1c895-6ff3-48bd-91d2-b05e1fb6d016.jpg	4	2021-06-23 19:01:35.17+05	2021-06-23 19:01:35.17+05	10	2
10	Телевизор №10	39000	\N	f	SALE	0	5fba9717-d762-4ab0-afa0-54806ddd43eb.jpg	3	2021-06-23 19:01:55.152+05	2021-06-23 19:01:55.152+05	10	3
11	Телевизор №11	65000	\N	f	SALE	0	99ca3b06-2573-4d01-b552-d58f2ae59aed.jpg	3	2021-06-23 19:02:11.706+05	2021-06-23 19:02:11.706+05	10	2
12	Телевизор №12	56000	\N	f	SALE	0	ef59566a-32a6-4323-be05-fb128adffb53.jpg	3	2021-06-23 19:02:29.232+05	2021-06-23 19:02:29.232+05	10	3
13	Телевизор №13	54000	\N	f	SALE	0	29fd7e09-ffdd-40c9-a7a3-fcef55bb6ad9.jpg	5	2021-06-23 19:03:08.588+05	2021-06-23 19:03:08.588+05	10	4
15	Телевизор №15	54000	\N	f	SALE	0	c1946516-00e8-4a0e-8bc9-34e270977d1c.jpg	4	2021-06-23 19:04:25.255+05	2021-06-23 19:04:25.255+05	10	1
14	Телевизор №14	76000	0	f	SALE	0	17593fd4-07d8-478e-aa8a-7eaff927baa8.jpg	0	2021-06-23 19:03:44.436+05	2021-06-24 00:30:19.907+05	10	2
\.


--
-- TOC entry 3458 (class 0 OID 32484)
-- Dependencies: 233
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, "createdAt", "updatedAt", "orderId", "itemId") FROM stdin;
\.


--
-- TOC entry 3456 (class 0 OID 32471)
-- Dependencies: 231
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- TOC entry 3460 (class 0 OID 32504)
-- Dependencies: 235
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (id, rate, "createdAt", "updatedAt", "userId", "itemId") FROM stdin;
\.


--
-- TOC entry 3444 (class 0 OID 32367)
-- Dependencies: 219
-- Data for Name: request_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request_roles (id, "requestId", "roleId") FROM stdin;
\.


--
-- TOC entry 3442 (class 0 OID 32352)
-- Dependencies: 217
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requests (id, name, value) FROM stdin;
\.


--
-- TOC entry 3438 (class 0 OID 32322)
-- Dependencies: 213
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, value) FROM stdin;
1	Admin
\.


--
-- TOC entry 3440 (class 0 OID 32332)
-- Dependencies: 215
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (id, "createdAt", "updatedAt", "userId", "roleId") FROM stdin;
1	2021-06-23 18:24:52.079+05	2021-06-23 18:24:52.079+05	1	1
\.


--
-- TOC entry 3436 (class 0 OID 32309)
-- Dependencies: 211
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, lastname, patronymic, phone, birthdate, "createdAt", "updatedAt") FROM stdin;
1	aa@aa.aa	$2b$05$EjKH9/mDP5RojK34aAXrMus6CWU/.FLu92WuO4.Nn489R6Bspvy3S	Admin	\N	\N	\N	\N	2021-06-23 18:24:52.043+05	2021-06-23 18:24:52.043+05
\.


--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 224
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_id_seq', 5, true);


--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 228
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 220
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, true);


--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 238
-- Name: cat_brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_brands_id_seq', 1, false);


--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 222
-- Name: cats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cats_id_seq', 25, true);


--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 236
-- Name: item_infos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_infos_id_seq', 48, true);


--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 226
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 15, true);


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 232
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 230
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 234
-- Name: ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratings_id_seq', 1, false);


--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 218
-- Name: request_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.request_roles_id_seq', 1, false);


--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 216
-- Name: requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requests_id_seq', 1, false);


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 212
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, true);


--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 214
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_id_seq', 1, true);


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 210
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 3262 (class 2606 OID 32422)
-- Name: brands brands_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_name_key UNIQUE (name);


--
-- TOC entry 3264 (class 2606 OID 32420)
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 32458)
-- Name: cart_items cart_items_cartId_itemId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "cart_items_cartId_itemId_key" UNIQUE ("cartId", "itemId");


--
-- TOC entry 3272 (class 2606 OID 32456)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3256 (class 2606 OID 32392)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- TOC entry 3284 (class 2606 OID 32545)
-- Name: cat_brands cat_brands_itemId_brandId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_brands
    ADD CONSTRAINT "cat_brands_itemId_brandId_key" UNIQUE ("itemId", "brandId");


--
-- TOC entry 3286 (class 2606 OID 32543)
-- Name: cat_brands cat_brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_brands
    ADD CONSTRAINT cat_brands_pkey PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 32407)
-- Name: cats cats_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_name_key UNIQUE (name);


--
-- TOC entry 3260 (class 2606 OID 32405)
-- Name: cats cats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_pkey PRIMARY KEY (id);


--
-- TOC entry 3282 (class 2606 OID 32530)
-- Name: item_infos item_infos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_infos
    ADD CONSTRAINT item_infos_pkey PRIMARY KEY (id);


--
-- TOC entry 3266 (class 2606 OID 32438)
-- Name: items items_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_name_key UNIQUE (name);


--
-- TOC entry 3268 (class 2606 OID 32436)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- TOC entry 3276 (class 2606 OID 32491)
-- Name: order_items order_items_orderId_itemId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "order_items_orderId_itemId_key" UNIQUE ("orderId", "itemId");


--
-- TOC entry 3278 (class 2606 OID 32489)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3274 (class 2606 OID 32476)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3280 (class 2606 OID 32509)
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- TOC entry 3252 (class 2606 OID 32372)
-- Name: request_roles request_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_roles
    ADD CONSTRAINT request_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 32374)
-- Name: request_roles request_roles_requestId_roleId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_roles
    ADD CONSTRAINT "request_roles_requestId_roleId_key" UNIQUE ("requestId", "roleId");


--
-- TOC entry 3246 (class 2606 OID 32362)
-- Name: requests requests_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_name_key UNIQUE (name);


--
-- TOC entry 3248 (class 2606 OID 32360)
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 32364)
-- Name: requests requests_value_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_value_key UNIQUE (value);


--
-- TOC entry 3238 (class 2606 OID 32327)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3240 (class 2606 OID 32329)
-- Name: roles roles_value_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_value_key UNIQUE (value);


--
-- TOC entry 3242 (class 2606 OID 32337)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3244 (class 2606 OID 32339)
-- Name: user_roles user_roles_userId_roleId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_userId_roleId_key" UNIQUE ("userId", "roleId");


--
-- TOC entry 3234 (class 2606 OID 32319)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3236 (class 2606 OID 32317)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3295 (class 2606 OID 32459)
-- Name: cart_items cart_items_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3296 (class 2606 OID 32464)
-- Name: cart_items cart_items_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "cart_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3291 (class 2606 OID 32393)
-- Name: carts carts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3304 (class 2606 OID 32551)
-- Name: cat_brands cat_brands_brandId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_brands
    ADD CONSTRAINT "cat_brands_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3303 (class 2606 OID 32546)
-- Name: cat_brands cat_brands_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_brands
    ADD CONSTRAINT "cat_brands_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3292 (class 2606 OID 32408)
-- Name: cats cats_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT "cats_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.cats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3302 (class 2606 OID 32531)
-- Name: item_infos item_infos_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_infos
    ADD CONSTRAINT "item_infos_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3294 (class 2606 OID 32444)
-- Name: items items_brandId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3293 (class 2606 OID 32439)
-- Name: items items_catId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_catId_fkey" FOREIGN KEY ("catId") REFERENCES public.cats(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3299 (class 2606 OID 32497)
-- Name: order_items order_items_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "order_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3298 (class 2606 OID 32492)
-- Name: order_items order_items_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3297 (class 2606 OID 32477)
-- Name: orders orders_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3301 (class 2606 OID 32515)
-- Name: ratings ratings_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT "ratings_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3300 (class 2606 OID 32510)
-- Name: ratings ratings_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3289 (class 2606 OID 32375)
-- Name: request_roles request_roles_requestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_roles
    ADD CONSTRAINT "request_roles_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES public.requests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3290 (class 2606 OID 32380)
-- Name: request_roles request_roles_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_roles
    ADD CONSTRAINT "request_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3288 (class 2606 OID 32345)
-- Name: user_roles user_roles_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3287 (class 2606 OID 32340)
-- Name: user_roles user_roles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2021-06-24 14:22:07 +05

--
-- PostgreSQL database dump complete
--

