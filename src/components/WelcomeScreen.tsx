import React, { useState } from 'react';
import { ChevronRight, BookOpen, Music, Gamepad2, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    title: "Welcome to Mindful Media Hub",
    subtitle: "Your sanctuary for intentional media consumption",
    content: "Step away from endless scrolling and embrace the joy of physical media - books, vinyl records, and meaningful experiences.",
    image: "https://images.unsplash.com/photo-1656004035327-1ced20adbc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHJlYWRpbmclMjBuYXR1cmUlMjBib29rc3xlbnwxfHx8fDE3NTY4MjA4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Track Your Mindful Moments",
    subtitle: "Celebrate every page turned, every song heard",
    content: "Log your time with books, music, and games. Build awareness of how you spend your precious attention.",
    image: "https://images.unsplash.com/photo-1735607231921-f1dade8c7b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZHMlMjBtdXNpYyUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU2ODIwODMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Connect Mindfully",
    subtitle: "Share your journey with like-minded souls",
    content: "Join a community that values depth over speed, quality over quantity, and presence over productivity.",
    image: "https://images.unsplash.com/photo-1596045571435-f7c6704bbfc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsJTIwbWVkaXRhdGlvbiUyMG5hdHVyZSUyMHplbnxlbnwxfHx8fDE3NTY4MjA4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentContent = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-muted flex flex-col lg:flex-row">
      {/* Left Side - Content (Desktop) */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 lg:max-w-2xl">
        {/* Progress Dots */}
        <div className="flex justify-center lg:justify-start pt-12 pb-6">
          <div className="flex space-x-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'bg-primary w-6' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-5xl font-medium text-foreground leading-tight">
              {currentContent.title}
            </h1>
            <p className="text-lg lg:text-xl text-primary font-medium">
              {currentContent.subtitle}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
              {currentContent.content}
            </p>
          </div>
        </div>

        {/* Media Type Icons */}
        <div className="flex justify-center lg:justify-start space-x-6 mb-8">
          {[
            { icon: BookOpen, color: 'text-primary' },
            { icon: Music, color: 'text-accent' },
            { icon: Gamepad2, color: 'text-primary' },
            { icon: Heart, color: 'text-accent' }
          ].map(({ icon: Icon, color }, index) => (
            <div
              key={index}
              className={`p-4 rounded-full bg-muted/50 ${color} transform transition-transform duration-300 hover:scale-110`}
            >
              <Icon size={28} />
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="lg:max-w-sm">
          <Button
            onClick={nextStep}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-6 text-lg font-medium shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {currentStep < onboardingSteps.length - 1 ? (
              <span className="flex items-center justify-center space-x-2">
                <span>Continue</span>
                <ChevronRight size={20} />
              </span>
            ) : (
              <span>Begin Your Journey</span>
            )}
          </Button>
        </div>
      </div>

      {/* Right Side - Image (Desktop) */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-xl rounded-3xl p-8 w-full max-w-lg lg:sticky lg:top-24">
          {/* Image */}
          <div className="relative w-full h-64 lg:h-80 mb-6 rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={currentContent.image}
              alt={currentContent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>

          {/* Mobile Text Content (Hidden on Desktop) */}
          <div className="lg:hidden text-center space-y-4">
            <h2 className="text-xl font-medium text-foreground leading-relaxed">
              {currentContent.title}
            </h2>
            <p className="text-primary font-medium">
              {currentContent.subtitle}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {currentContent.content}
            </p>
          </div>

          {/* Desktop Enhancement - Quote or Additional Info */}
          <div className="hidden lg:block text-center space-y-3">
            <p className="text-muted-foreground text-sm">
              "The quieter you become, the more you can hear."
            </p>
            <p className="text-xs text-muted-foreground">— Ram Dass</p>
          </div>
        </Card>
      </div>

      {/* Mobile Action Button */}
      <div className="lg:hidden p-6">
        <Button
          onClick={nextStep}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-6 text-lg font-medium shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          {currentStep < onboardingSteps.length - 1 ? (
            <span className="flex items-center justify-center space-x-2">
              <span>Continue</span>
              <ChevronRight size={20} />
            </span>
          ) : (
            <span>Begin Your Journey</span>
          )}
        </Button>
      </div>
    </div>
  );
}