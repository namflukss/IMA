import { useRecipeApp } from './state/useRecipeApp';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import RecipeScreen from './screens/RecipeScreen';
import CookModeScreen from './screens/CookModeScreen';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import EditRecipeScreen from './screens/EditRecipeScreen';
import PlansScreen from './screens/PlansScreen';
import PlanDetailScreen from './screens/PlanDetailScreen';
import PlanEditScreen from './screens/PlanEditScreen';
import PlanPickerScreen from './screens/PlanPickerScreen';

export default function App() {
  const app = useRecipeApp();

  if (app.isCookMode) {
    return <CookModeScreen app={app} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'oklch(0.985 0.004 60)', color: 'oklch(0.24 0.015 50)' }}>
      <div style={{ flex: 1 }}>
        {app.isHome && <HomeScreen app={app} />}
        {app.isCategory && <CategoryScreen app={app} />}
        {app.isRecipe && <RecipeScreen app={app} />}
        {app.isEdit && <EditRecipeScreen app={app} />}
        {app.isSearch && <SearchScreen app={app} />}
        {app.isFavorites && <FavoritesScreen app={app} />}
        {app.isPlans && <PlansScreen app={app} />}
        {app.isPlanDetail && <PlanDetailScreen app={app} />}
        {app.isPlanEdit && <PlanEditScreen app={app} />}
        {app.isPlanPicker && <PlanPickerScreen app={app} />}
      </div>
      {app.showTabs && <BottomNav app={app} />}
    </div>
  );
}
