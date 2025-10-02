import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { StudioSettingItem } from '../../types';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';
import { Switch } from '../primitives/Switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../primitives/Select';
import { Skeleton } from '../primitives/Skeleton';
import { trpc } from '../../lib/trpc';
import Icon from '../Icon';
import { cn } from '../lib/utils';

const StudioSettings = () => {
    const { data: settings, isLoading, refetch } = trpc.studio.getSettings.useQuery();
    const { mutate, isPending } = trpc.studio.updateSettings.useMutation();
    const [localSettings, setLocalSettings] = useState<StudioSettingItem[] | null>(null);
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [isSaved, setIsSaved] = useState(false);
    
    const [activeCategory, setActiveCategory] = useState<string>('');

    const categories = useMemo(() => {
        if (!settings) return [];
        return [...new Set(settings.map(s => s.category))];
    }, [settings]);

    useEffect(() => {
        if (settings) {
            setLocalSettings(JSON.parse(JSON.stringify(settings)));
            if (!activeCategory && categories.length > 0) {
                setActiveCategory(categories[0]);
            }
        }
    }, [settings, categories, activeCategory]);

    const validateField = (setting: StudioSettingItem, value: string): string | null => {
        if (setting.type === 'string' && setting.validation) {
            const regex = new RegExp(setting.validation.pattern);
            if (!regex.test(value)) {
                return setting.validation.message;
            }
        }
        return null;
    };
    
    const handleSettingChange = (id: string, value: string | boolean) => {
        if (!localSettings) return;
        
        let validationError: string | null = null;
        const newSettings = localSettings.map(s => {
            if (s.id === id) {
                if (typeof value === 'string') {
                    validationError = validateField(s, value);
                }
                return { ...s, value: value as any };
            }
            return s;
        });
        
        setLocalSettings(newSettings);
        setErrors(prev => ({ ...prev, [id]: validationError }));
        setIsSaved(false);
    };

    const handleSaveChanges = useCallback(() => {
        if (!localSettings) return;

        // Perform a full validation before saving
        const newErrors: Record<string, string | null> = {};
        let hasErrors = false;
        localSettings.forEach(setting => {
            if (setting.type === 'string') {
                const error = validateField(setting, setting.value);
                if (error) {
                    newErrors[setting.id] = error;
                    hasErrors = true;
                }
            }
        });

        setErrors(newErrors);

        if (hasErrors) {
            return;
        }

        mutate(localSettings, {
            onSuccess: () => {
                refetch();
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 2000);
            }
        });
    }, [localSettings, mutate, refetch]);
    
    const renderSettingControl = (setting: StudioSettingItem) => {
        const error = errors[setting.id];
        switch (setting.type) {
            case 'boolean':
                return <Switch checked={!!setting.value} onCheckedChange={(checked) => handleSettingChange(setting.id, checked)} />;
            case 'string':
                return (
                    <div className="w-full max-w-xs">
                        <Input
                            className={cn(error && "border-destructive focus-visible:ring-destructive")}
                            value={setting.value as string}
                            placeholder={setting.placeholder}
                            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                            aria-invalid={!!error}
                            aria-describedby={error ? `${setting.id}-error` : undefined}
                        />
                        {error && <p id={`${setting.id}-error`} className="text-sm text-destructive mt-1.5">{error}</p>}
                    </div>
                );
            case 'select':
                return (
                    <Select value={setting.value as string} onValueChange={(value) => handleSettingChange(setting.id, value)}>
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {setting.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                    </Select>
                );
            default:
                return null;
        }
    };
    
    if (isLoading || !localSettings) {
        return (
            <div className="bg-component rounded-custom shadow-custom h-full flex flex-col border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                    <Skeleton className="h-8 w-1/3 mb-2" />
                     <Skeleton className="h-4 w-2/3" />
                     <div className="mt-4 flex gap-2">
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-28" />
                     </div>
                </div>
                <div className="p-6 space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center pt-6 first:pt-0 border-t border-border first:border-none">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-48" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                            <Skeleton className="h-10 w-24" />
                        </div>
                    ))}
                </div>
                 <div className="p-6 border-t border-border bg-sidebar/50">
                     <Skeleton className="h-10 w-32" />
                 </div>
            </div>
        );
    }

    const filteredSettings = localSettings.filter(s => s.category === activeCategory);
    const hasAnyErrors = Object.values(errors).some(e => e !== null);

    return (
        <div className="bg-component rounded-custom shadow-custom h-full flex flex-col border border-border overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-border shrink-0">
                <h2 className="text-xl font-bold text-primary">Studio Settings</h2>
                <p className="text-secondary text-sm mt-1">Manage general settings, integrations, and preferences for the Studio app.</p>
                <nav className="mt-4">
                    <ul className="flex flex-row items-center gap-2 overflow-x-auto">
                        {categories.map((category) => (
                            <li key={category} className="shrink-0">
                                <button
                                    onClick={() => setActiveCategory(category)}
                                    className={cn(
                                        'flex items-center p-3 rounded-custom text-left text-sm transition-colors whitespace-nowrap font-semibold',
                                        activeCategory === category 
                                            ? 'bg-accent-secondary/20 text-accent-secondary'
                                            : 'text-secondary hover:bg-accent-secondary/10 hover:text-primary'
                                    )}
                                >
                                    <span>{category}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
                 <div className="space-y-6 divide-y divide-border -mt-6">
                    {filteredSettings.map(setting => (
                        <div key={setting.id} className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
                            <div>
                                <label className="font-semibold text-primary block">{setting.label}</label>
                                <p className="text-sm text-secondary mt-1 max-w-md">{setting.description}</p>
                            </div>
                            <div className="shrink-0 w-full sm:w-auto flex justify-end">
                                {renderSettingControl(setting)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             <div className="p-6 border-t border-border bg-sidebar/50 flex items-center gap-4 shrink-0">
                <Button onClick={handleSaveChanges} isLoading={isPending} disabled={hasAnyErrors}>
                    Save Changes
                </Button>
                {isSaved && (
                    <div className="flex items-center gap-2 text-success animate-fade-in">
                        <Icon name="check-icon" className="w-5 h-5"/>
                        <span className="text-sm font-medium">Configuration saved!</span>
                    </div>
                )}
                {hasAnyErrors && !isPending && (
                     <div className="flex items-center gap-2 text-destructive animate-fade-in">
                        <Icon name="exclamation-triangle-icon" className="w-5 h-5"/>
                        <span className="text-sm font-medium">Please fix the errors before saving.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudioSettings;