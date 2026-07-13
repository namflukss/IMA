import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { INITIAL_RECIPES } from '../data/recipes';
import { hueGrad, hueSolid, hueTint, hueTintText, ACCENT_GRAD, ACCENT_SOLID, ACCENT_TINT, ACCENT_TINT_BORDER } from '../lib/colors';

const STORAGE_KEY = 'moms-recipes-app-v1';

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const NAV_FIELDS = ['screen', 'categoryId', 'recipeId', 'planId'];

function snapshot(nav) {
  const s = {};
  for (const k of NAV_FIELDS) s[k] = nav[k];
  return s;
}

export function useRecipeApp() {
  const stored = loadStored();

  const [recipes, setRecipes] = useState(stored?.recipes ?? INITIAL_RECIPES);
  const [favorites, setFavorites] = useState(stored?.favorites ?? {});
  const [plans, setPlans] = useState(stored?.plans ?? []);

  const [nav, setNav] = useState({ screen: 'home', categoryId: null, recipeId: null, planId: null });
  const stackRef = useRef([]);

  const [query, setQuery] = useState('');
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [isNewRecipe, setIsNewRecipe] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [cookStepIndex, setCookStepIndex] = useState(0);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isNewPlan, setIsNewPlan] = useState(false);

  // Persist data (not navigation) to localStorage.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ recipes, favorites, plans }));
  }, [recipes, favorites, plans]);

  // Browser-history integration so the Android back button/gesture navigates
  // within the app instead of closing it.
  useEffect(() => {
    history.replaceState({ depth: 0 }, '');
    const onPop = () => applyBack();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyBack = useCallback(() => {
    const st = stackRef.current;
    const prev = st.pop();
    setEditingRecipe(null);
    setEditingPlan(null);
    if (!prev) {
      setNav({ screen: 'home', categoryId: null, recipeId: null, planId: null });
    } else {
      setNav(prev);
    }
  }, []);

  const push = useCallback((next) => {
    stackRef.current = [...stackRef.current, snapshot(nav)];
    setNav((n) => ({ ...n, ...next }));
    history.pushState({ depth: stackRef.current.length }, '');
  }, [nav]);

  const switchTab = useCallback((screen) => {
    stackRef.current = [];
    setEditingRecipe(null);
    setEditingPlan(null);
    setNav({ screen, categoryId: null, recipeId: null, planId: null });
    history.pushState({ depth: 0 }, '');
  }, []);

  const goBack = useCallback(() => {
    history.back();
  }, []);

  const goHome = useCallback(() => switchTab('home'), [switchTab]);
  const goSearch = useCallback(() => switchTab('search'), [switchTab]);
  const goFavorites = useCallback(() => switchTab('favorites'), [switchTab]);
  const goPlans = useCallback(() => switchTab('plans'), [switchTab]);

  const openCategory = useCallback((id) => push({ screen: 'category', categoryId: id, recipeId: null }), [push]);
  const openRecipe = useCallback((id) => {
    setCheckedIngredients({});
    push({ screen: 'recipe', recipeId: id });
  }, [push]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((f) => ({ ...f, [id]: !f[id] }));
  }, []);
  const toggleIngredientCheck = useCallback((i) => {
    setCheckedIngredients((c) => ({ ...c, [i]: !c[i] }));
  }, []);

  const startAddRecipe = useCallback(() => {
    setEditingRecipe({ id: null, name: '', categoryId: nav.categoryId || CATEGORIES[0].id, servings: 4, prepTime: 15, cookTime: 30, ingredients: [''], steps: [''], notes: '' });
    setIsNewRecipe(true);
    push({ screen: 'edit' });
  }, [push, nav.categoryId]);

  const startEditRecipe = useCallback((recipe) => {
    setEditingRecipe(JSON.parse(JSON.stringify(recipe)));
    setIsNewRecipe(false);
    push({ screen: 'edit' });
  }, [push]);

  const cancelEdit = goBack;

  const saveRecipe = useCallback(() => {
    setRecipes((rs) => {
      const clean = { ...editingRecipe, ingredients: editingRecipe.ingredients.filter((x) => x.trim()), steps: editingRecipe.steps.filter((x) => x.trim()) };
      if (isNewRecipe) return [...rs, { ...clean, id: 'r' + Date.now() }];
      return rs.map((r) => (r.id === clean.id ? clean : r));
    });
    goBack();
  }, [editingRecipe, isNewRecipe, goBack]);

  const updateField = useCallback((key, value) => setEditingRecipe((r) => ({ ...r, [key]: value })), []);
  const updateIngredient = useCallback((i, v) => setEditingRecipe((r) => { const arr = [...r.ingredients]; arr[i] = v; return { ...r, ingredients: arr }; }), []);
  const addIngredient = useCallback(() => setEditingRecipe((r) => ({ ...r, ingredients: [...r.ingredients, ''] })), []);
  const removeIngredient = useCallback((i) => setEditingRecipe((r) => { const arr = r.ingredients.filter((_, idx) => idx !== i); return { ...r, ingredients: arr.length ? arr : [''] }; }), []);
  const updateStep = useCallback((i, v) => setEditingRecipe((r) => { const arr = [...r.steps]; arr[i] = v; return { ...r, steps: arr }; }), []);
  const addStep = useCallback(() => setEditingRecipe((r) => ({ ...r, steps: [...r.steps, ''] })), []);
  const removeStep = useCallback((i) => setEditingRecipe((r) => { const arr = r.steps.filter((_, idx) => idx !== i); return { ...r, steps: arr.length ? arr : [''] }; }), []);

  const startCookMode = useCallback(() => { setCookStepIndex(0); push({ screen: 'cookMode' }); }, [push]);
  const currentRecipeStepsLength = useMemo(() => recipes.find((r) => r.id === nav.recipeId)?.steps.length ?? 0, [recipes, nav.recipeId]);
  const nextCookStep = useCallback(() => setCookStepIndex((i) => Math.min(i + 1, currentRecipeStepsLength - 1)), [currentRecipeStepsLength]);
  const prevCookStep = useCallback(() => setCookStepIndex((i) => Math.max(i - 1, 0)), []);
  const exitCookMode = goBack;

  const openPlan = useCallback((id) => push({ screen: 'planDetail', planId: id }), [push]);
  const openPlanPicker = useCallback(() => push({ screen: 'planPicker' }), [push]);

  const startAddPlan = useCallback(() => {
    setEditingPlan({ id: null, name: '', guests: 4, date: '' });
    setIsNewPlan(true);
    push({ screen: 'planEdit' });
  }, [push]);

  const editCurrentPlan = useCallback(() => {
    const plan = plans.find((p) => p.id === nav.planId);
    setEditingPlan({ ...plan });
    setIsNewPlan(false);
    push({ screen: 'planEdit' });
  }, [plans, nav.planId, push]);

  const cancelPlanEdit = goBack;

  const savePlan = useCallback(() => {
    setPlans((ps) => {
      const ep = editingPlan;
      if (isNewPlan) return [...ps, { id: 'p' + Date.now(), name: ep.name, guests: ep.guests, date: ep.date, recipeIds: [] }];
      return ps.map((p) => (p.id === ep.id ? { ...p, name: ep.name, guests: ep.guests, date: ep.date } : p));
    });
    goBack();
  }, [editingPlan, isNewPlan, goBack]);

  const deleteCurrentPlan = useCallback(() => {
    setPlans((ps) => ps.filter((p) => p.id !== nav.planId));
    goBack();
  }, [nav.planId, goBack]);

  const updatePlanField = useCallback((key, value) => setEditingPlan((p) => ({ ...p, [key]: value })), []);

  const togglePlanRecipe = useCallback((recipeId) => {
    setPlans((ps) => ps.map((p) => {
      if (p.id !== nav.planId) return p;
      const has = p.recipeIds.includes(recipeId);
      return { ...p, recipeIds: has ? p.recipeIds.filter((id) => id !== recipeId) : [...p.recipeIds, recipeId] };
    }));
  }, [nav.planId]);

  const removeRecipeFromPlan = useCallback((recipeId) => {
    setPlans((ps) => ps.map((p) => (p.id === nav.planId ? { ...p, recipeIds: p.recipeIds.filter((id) => id !== recipeId) } : p)));
  }, [nav.planId]);

  const decorateRecipe = useCallback((r) => {
    const cat = CATEGORIES.find((c) => c.id === r.categoryId);
    const h = cat ? cat.hue : 25;
    return {
      ...r,
      isFav: !!favorites[r.id],
      isFavOff: !favorites[r.id],
      toggleFav: (e) => { e.stopPropagation(); toggleFavorite(r.id); },
      open: () => openRecipe(r.id),
      grad: hueGrad(h),
      solid: hueSolid(h),
      tint: hueTint(h),
      categoryName: cat ? cat.name : '',
    };
  }, [favorites, toggleFavorite, openRecipe]);

  // ---- derived view, analogous to the prototype's renderVals() ----

  const categoriesView = useMemo(() => CATEGORIES.map((c) => ({
    ...c,
    count: recipes.filter((r) => r.categoryId === c.id).length,
    grad: hueGrad(c.hue),
    solid: hueSolid(c.hue),
    tint: hueTint(c.hue),
    tintText: hueTintText(c.hue),
    tileBg: c.image ? `linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0.05)), url(${c.image}) center/cover` : hueGrad(c.hue),
    open: () => openCategory(c.id),
  })), [recipes, openCategory]);

  const currentCategory = useMemo(() => CATEGORIES.find((c) => c.id === nav.categoryId) || { name: '' }, [nav.categoryId]);
  const categoryRecipesView = useMemo(() => recipes.filter((r) => r.categoryId === nav.categoryId).map(decorateRecipe), [recipes, nav.categoryId, decorateRecipe]);

  const currentRecipe = useMemo(() => {
    const raw = recipes.find((r) => r.id === nav.recipeId);
    if (!raw) return null;
    const cat = CATEGORIES.find((c) => c.id === raw.categoryId);
    const h = cat ? cat.hue : 25;
    return {
      ...raw,
      isFav: !!favorites[raw.id],
      isFavOff: !favorites[raw.id],
      toggleFav: () => toggleFavorite(raw.id),
      edit: () => startEditRecipe(raw),
      categoryName: cat ? cat.name : '',
      grad: hueGrad(h),
      solid: hueSolid(h),
      tint: hueTint(h),
      ingredientsView: raw.ingredients.map((text, i) => ({ text, checked: !!checkedIngredients[i], uncheckedFlag: !checkedIngredients[i], toggle: () => toggleIngredientCheck(i) })),
      stepsView: raw.steps.map((text, i) => ({ n: i + 1, text })),
    };
  }, [recipes, nav.recipeId, favorites, toggleFavorite, startEditRecipe, checkedIngredients, toggleIngredientCheck]);

  let cookStep = null, cookTotal = 0, isFirstCookStep = false, isLastCookStep = false;
  if (currentRecipe) {
    cookTotal = currentRecipe.stepsView.length;
    const idx = Math.min(cookStepIndex, cookTotal - 1);
    cookStep = currentRecipe.stepsView[idx];
    isFirstCookStep = idx === 0;
    isLastCookStep = idx === cookTotal - 1;
  }

  const favoritesView = useMemo(() => recipes.filter((r) => favorites[r.id]).map(decorateRecipe), [recipes, favorites, decorateRecipe]);

  const searchResultsView = useMemo(() => {
    const q = query.trim();
    return (q ? recipes.filter((r) => r.name.indexOf(q) !== -1) : recipes).map(decorateRecipe);
  }, [recipes, query, decorateRecipe]);

  const editIngredientsView = useMemo(() => editingRecipe ? editingRecipe.ingredients.map((val, i) => ({ val, onChange: (e) => updateIngredient(i, e.target.value), remove: () => removeIngredient(i) })) : [], [editingRecipe, updateIngredient, removeIngredient]);
  const editStepsView = useMemo(() => editingRecipe ? editingRecipe.steps.map((val, i) => ({ val, n: i + 1, onChange: (e) => updateStep(i, e.target.value), remove: () => removeStep(i) })) : [], [editingRecipe, updateStep, removeStep]);
  const categoryChipsView = useMemo(() => editingRecipe ? CATEGORIES.map((c) => ({ ...c, selected: editingRecipe.categoryId === c.id, unselectedFlag: editingRecipe.categoryId !== c.id, select: () => updateField('categoryId', c.id) })) : [], [editingRecipe, updateField]);

  const plansView = useMemo(() => plans.map((p) => ({ ...p, hasDate: !!p.date, recipeCount: p.recipeIds.length, open: () => openPlan(p.id) })), [plans, openPlan]);

  const currentPlanRaw = useMemo(() => plans.find((p) => p.id === nav.planId), [plans, nav.planId]);
  const currentPlan = useMemo(() => {
    if (!currentPlanRaw) return null;
    const planRecipes = currentPlanRaw.recipeIds.map((rid) => recipes.find((r) => r.id === rid)).filter(Boolean).map((r) => ({ ...decorateRecipe(r), remove: () => removeRecipeFromPlan(r.id) }));
    return {
      ...currentPlanRaw,
      hasDate: !!currentPlanRaw.date,
      recipeCount: planRecipes.length,
      hasRecipes: planRecipes.length > 0,
      noRecipes: planRecipes.length === 0,
      recipesView: planRecipes,
    };
  }, [currentPlanRaw, recipes, decorateRecipe, removeRecipeFromPlan]);

  const planPickerRecipesView = useMemo(() => {
    if (!currentPlanRaw) return [];
    return recipes.map((r) => {
      const included = currentPlanRaw.recipeIds.includes(r.id);
      return { ...decorateRecipe(r), included, notIncluded: !included, toggle: () => togglePlanRecipe(r.id) };
    });
  }, [currentPlanRaw, recipes, decorateRecipe, togglePlanRecipe]);

  const screen = nav.screen;
  const showTabs = screen === 'home' || screen === 'search' || screen === 'favorites' || screen === 'plans';

  return {
    screen,
    isHome: screen === 'home', isCategory: screen === 'category', isRecipe: screen === 'recipe',
    isEdit: screen === 'edit', isSearch: screen === 'search', isFavorites: screen === 'favorites',
    isPlans: screen === 'plans', isPlanDetail: screen === 'planDetail', isPlanEdit: screen === 'planEdit',
    isPlanPicker: screen === 'planPicker', isCookMode: screen === 'cookMode',

    showTabs,
    homeColor: screen === 'home' ? ACCENT_SOLID : 'oklch(0.6 0.01 50)',
    searchColor: screen === 'search' ? ACCENT_SOLID : 'oklch(0.6 0.01 50)',
    favColor: screen === 'favorites' ? ACCENT_SOLID : 'oklch(0.6 0.01 50)',
    plansColor: screen === 'plans' ? ACCENT_SOLID : 'oklch(0.6 0.01 50)',
    favIconFill: screen === 'favorites' ? ACCENT_SOLID : 'none',
    accentGrad: ACCENT_GRAD, accentSolid: ACCENT_SOLID, accentTint: ACCENT_TINT, accentTintBorder: ACCENT_TINT_BORDER,

    categoriesView, currentCategory, categoryRecipesView,
    currentRecipe,
    cookStep, cookTotal,
    cookProgressText: `שלב ${cookStepIndex + 1} מתוך ${cookTotal}`,
    cookProgressPct: cookTotal ? Math.round(((cookStepIndex + 1) / cookTotal) * 100) : 0,
    isEvenCookStep: (cookStepIndex % 2) === 0,
    isOddCookStep: (cookStepIndex % 2) === 1,
    isFirstCookStep, isLastCookStep,
    isFirstCookStepOff: !isFirstCookStep, isLastCookStepOff: !isLastCookStep,

    favoritesView, hasFavorites: favoritesView.length > 0, noFavorites: favoritesView.length === 0,
    query, searchResultsView, noSearchResults: searchResultsView.length === 0,

    editing: editingRecipe, editIngredientsView, editStepsView, categoryChipsView,
    isNewRecipe, isEditExisting: !isNewRecipe,

    plansView, hasPlans: plansView.length > 0, noPlans: plansView.length === 0,
    currentPlan, editingPlan, planPickerRecipesView,
    isNewPlan, isEditPlanExisting: !isNewPlan,

    // actions
    goHome, goSearch, goFavorites, goPlans, goBack,
    startAddRecipe, startEditRecipe, cancelEdit, saveRecipe,
    updateName: (e) => updateField('name', e.target.value),
    updateServings: (e) => updateField('servings', e.target.value),
    updatePrep: (e) => updateField('prepTime', e.target.value),
    updateCook: (e) => updateField('cookTime', e.target.value),
    updateNotes: (e) => updateField('notes', e.target.value),
    addIngredient, addStep,
    setQuery: (e) => setQuery(e.target.value),

    startCookMode, nextCookStep, prevCookStep, exitCookMode,

    startAddPlan, editCurrentPlan, deleteCurrentPlan, cancelPlanEdit, savePlan, openPlanPicker,
    updatePlanName: (e) => updatePlanField('name', e.target.value),
    updatePlanGuests: (e) => updatePlanField('guests', e.target.value),
    updatePlanDate: (e) => updatePlanField('date', e.target.value),
  };
}
