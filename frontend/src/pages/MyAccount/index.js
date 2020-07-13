import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PageArea, AdsArea, ModalArea } from './styled';
import useApi from '../../helpers/OlxAPI';
import  AdItem  from '../../components/partials/AdItem';
import Modal from '../../components/partials/Modal';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { PageContainer, PageTitle, ErrorMessage, SuccessMessage } from '../../components/MainComponents';

const Page = () => {
    const api = useApi();
    const fileField = useRef();
    const history = useHistory();

    const [userData, setUserData] = useState({});

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState();
    
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState(false);
    const [adId, setAdId] = useState();

    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(''); 
    const [sucess, setSuccess] = useState(''); 

    const [ads, setAds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [adIndex, setAdIndex] = useState();

    useEffect(() => {
        if(showModal) {
            setCategory(ads[adIndex].category);
            setTitle(ads[adIndex].title);
            setPrice(ads[adIndex].price);
            setPriceNegotiable(ads[adIndex].priceNegotiable);
            setDesc(ads[adIndex].description);   
            setStatus(ads[adIndex].status);  
            setAdId(ads[adIndex].id); 
        }
    }, [showModal]);

    useEffect(() => {
        const getCategories = async ()=> {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(() => {
        if(userData) {
            setName(userData.name);
            setEmail(userData.email);
            setStateLoc(userData.state);
        }
    }, [userData]);

    useEffect(()=> {
        const getUserData = async () => {
            const uList = await api.getUserData();
            setUserData(uList);
            setAds(uList.ads);
        }
        getUserData();
    }, []);

    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    const handleSubmitAd = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const fData = new FormData();
        fData.append('status', status);
        fData.append('title', title);
        fData.append('price', price);
        fData.append('priceNegotiable', priceNegotiable);
        fData.append('description', desc);
        fData.append('category', category);

        if(fileField.current.files.length > 0) {
            for(let i=0; i<fileField.current.files.length;i++) {
                fData.append('img', fileField.current.files[i]);
            }
        }

        const json = await api.updateAd(adId, fData);

        if(!json.error) {
            history.push(`/ad/${adId}`);
        } else {
            setError(json.error);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirmPassword){
            setError('Senhas não batem');
            setDisabled(false);
            return;
        }

        const json = await api.updateUserData(name, email, password, stateLoc);

        if(json.error) {
            setError(json.error);
            setSuccess('');
            setDisabled(false);
        }else{
            setSuccess('Usuário alterado com sucesso');
            setError('');
            setDisabled(false);
        }

    } 

    const handleModal = (v,i) => {
        setShowModal(v);
        setAdIndex(i);
    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol:'.',
        allowDecimal: true,
        decimalSymbol: ','
    });

    console.log(ads);

    return (
        <PageContainer>
            <PageTitle>Minha Conta</PageTitle>
            <PageArea>
                {error && 
                    <ErrorMessage>{error}</ErrorMessage>
                }

                {sucess && 
                    <SuccessMessage>{sucess}</SuccessMessage>
                }

                <form onSubmit={handleSubmit}>
                <label className="area">
                        <div className="area--title">Nome Completo</div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled} 
                                value={name}
                                onChange={e=>setName(e.target.value)}  
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required >
                                {stateList.map((i, k)=>
                                    <option 
                                        key={k} 
                                        value={i._id} 
                                        selected={userData.state === i.name ? true : false} 
                                    >{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input 
                                type="email" 
                                disabled={disabled} 
                                value={email}
                                onChange={e=>setEmail(e.target.value)}  
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled} 
                                value={password}
                                onChange={e=>setPassword(e.target.value)}  
                                required  
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled} 
                                value={confirmPassword}
                                onChange={e=>setConfirmPassword(e.target.value)}  
                                required  
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Atualizar Dados</button>
                        </div>
                    </label>
                </form>
            </PageArea>

            <PageTitle>Meus Anúncios</PageTitle>

            <AdsArea>
                {ads.length > 0 &&                
                    ads.map((v,k) => 
                        <AdItem 
                            key={k} 
                            data={v} 
                            changeModal={handleModal} 
                            adIndex={k} 
                        />
                    )}
            </AdsArea>

            <Modal visible={showModal} setVisible={setShowModal}>

            <PageContainer>
            <ModalArea>
            <form onSubmit={handleSubmitAd}>
                    <label className="area">
                        <div className="area--title">Titulo</div>
                        <div className="area--input">
                            <input 
                                type="titulo" 
                                disabled={disabled} 
                                value={title}
                                onChange={e=>setTitle(e.target.value)}  
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)}
                                required
                            >                                 
                            <option></option>
                            {categories && categories.map(i=>
                                <option 
                                    key={i._id} 
                                    value={i._id}
                                    selected={category == i.name ? 'selected' : '' }
                                >
                                {i.name}</option>
                            )}                        
                         
                            </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                        <MaskedInput 
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                        />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input 
                                  className="check"
                                  type="checkbox"
                                  disabled={disabled}
                                  checked={priceNegotiable}
                                  onChange={e=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <textarea 
                                disabled={disabled}
                                value={desc}
                                onChange={e=>setDesc(e.target.value)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Imagens (1 ou mais)</div>
                        <div className="area--input">
                            <input 
                                 type="file"
                                 disabled={disabled}
                                 ref={fileField}
                                 multiple
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Desativar Anúncio</div>
                        <div className="area--input">
                            <input 
                                  className="check"
                                  type="checkbox"
                                  disabled={disabled}
                                  checked={setStatus}
                                  onChange={e=>setStatus(!status)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button >Alterar Anúncio</button>
                        </div>
                    </label>
                </form>
                </ModalArea>   
                </PageContainer>
            </Modal>

        </PageContainer>
    )
}

export default Page;